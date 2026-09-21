import * as i0 from '@angular/core';
import { InjectionToken, makeEnvironmentProviders, inject, Injectable, input, effect, Component } from '@angular/core';
import { HeadlessPageRendererComponent } from '@jmgduarte/headless-angular';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

const HEADLESS_PREMIUM_SEO_CONFIG = new InjectionToken('HEADLESS_PREMIUM_SEO_CONFIG', { factory: () => ({}) });
function withPremiumSeo(config = {}) {
    return makeEnvironmentProviders([
        {
            provide: HEADLESS_PREMIUM_SEO_CONFIG,
            useValue: config,
        },
    ]);
}

class SeoMetadataService {
    document = inject(DOCUMENT);
    meta = inject(Meta);
    title = inject(Title);
    config = inject(HEADLESS_PREMIUM_SEO_CONFIG);
    managed = new Set();
    apply(metadata, fallbackTitle) {
        this.removeManaged();
        const title = fallbackTitle || metadata?.title;
        if (title)
            this.title.setTitle(title);
        if (metadata?.description)
            this.setName('description', metadata.description);
        const canonical = this.publicUrl(metadata?.canonical);
        if (canonical)
            this.setCanonical(canonical);
        if (metadata?.robots) {
            this.setName('robots', `${metadata.robots.index === false ? 'noindex' : 'index'},${metadata.robots.follow === false ? 'nofollow' : 'follow'}`);
        }
        const openGraph = metadata?.openGraph;
        if (openGraph) {
            this.setProperty('og:title', openGraph.title);
            this.setProperty('og:description', openGraph.description);
            this.setProperty('og:url', this.publicUrl(openGraph.url));
            this.setProperty('og:type', openGraph.type);
            this.setProperty('og:image', openGraph.image?.src);
        }
        const twitter = metadata?.twitter;
        if (twitter) {
            this.setName('twitter:card', twitter.card);
            this.setName('twitter:title', twitter.title);
            this.setName('twitter:description', twitter.description);
            this.setName('twitter:image', twitter.image?.src);
        }
    }
    publicUrl(source) {
        if (!source)
            return undefined;
        const frontendUrl = this.config.frontendUrl?.trim();
        if (!frontendUrl)
            return source;
        try {
            const base = new URL(frontendUrl);
            const sourceUrl = new URL(source);
            base.pathname = sourceUrl.pathname;
            base.search = sourceUrl.search;
            base.hash = sourceUrl.hash;
            return base.toString();
        }
        catch {
            return source;
        }
    }
    setName(name, content) {
        if (!content)
            return;
        this.meta.updateTag({ name, content });
        this.managed.add(`name|${name}`);
    }
    setProperty(property, content) {
        if (!content)
            return;
        this.meta.updateTag({ property, content });
        this.managed.add(`property|${property}`);
    }
    setCanonical(url) {
        let link = this.document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = this.document.createElement('link');
            link.rel = 'canonical';
            this.document.head.appendChild(link);
        }
        link.href = url;
        this.managed.add('canonical');
    }
    removeManaged() {
        for (const key of this.managed) {
            if (key === 'canonical')
                this.document.head.querySelector('link[rel="canonical"]')?.remove();
            else {
                const [attribute, value] = key.split('|');
                this.meta.removeTag(`${attribute}="${value}"`);
            }
        }
        this.managed.clear();
    }
    static ɵfac = function SeoMetadataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SeoMetadataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SeoMetadataService, factory: SeoMetadataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SeoMetadataService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

// export class PremiumPageRendererComponent implements OnChanges {
class PremiumPageRendererComponent {
    schema = input.required(...(ngDevMode ? [{ debugName: "schema" }] : /* istanbul ignore next */ []));
    titleFormatter = input(...(ngDevMode ? [undefined, { debugName: "titleFormatter" }] : /* istanbul ignore next */ []));
    seo = inject(SeoMetadataService);
    // ngOnChanges(): void {
    //   const schema = this.schema();
    //   const title = schema.page.seo?.title ?? schema.page.title;
    //   const formattedTitle = this.titleFormatter()?.(title) ?? title;
    //   this.seo.apply(schema.page.seo, formattedTitle);
    // }
    constructor() {
        effect(() => {
            const schema = this.schema();
            const title = schema.page.seo?.title ?? schema.page.title;
            const formattedTitle = this.titleFormatter()?.(title) ?? title;
            this.seo.apply(schema.page.seo, formattedTitle);
        });
    }
    static ɵfac = function PremiumPageRendererComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PremiumPageRendererComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PremiumPageRendererComponent, selectors: [["headless-premium-page-renderer"]], inputs: { schema: [1, "schema"], titleFormatter: [1, "titleFormatter"] }, decls: 1, vars: 1, consts: [[3, "schema"]], template: function PremiumPageRendererComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "headless-page-renderer", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("schema", ctx.schema());
        } }, dependencies: [HeadlessPageRendererComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PremiumPageRendererComponent, [{
        type: Component,
        args: [{
                selector: 'headless-premium-page-renderer',
                imports: [HeadlessPageRendererComponent],
                template: '<headless-page-renderer [schema]="schema()" />',
            }]
    }], () => [], { schema: [{ type: i0.Input, args: [{ isSignal: true, alias: "schema", required: true }] }], titleFormatter: [{ type: i0.Input, args: [{ isSignal: true, alias: "titleFormatter", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PremiumPageRendererComponent, { className: "PremiumPageRendererComponent", filePath: "lib/components/premium-page-renderer.component.ts", lineNumber: 12 }); })();

/**
 * Generated bundle index. Do not edit.
 */

export { HEADLESS_PREMIUM_SEO_CONFIG, PremiumPageRendererComponent, SeoMetadataService, withPremiumSeo };
//# sourceMappingURL=jmgduarte-headless-angular-premium.mjs.map
