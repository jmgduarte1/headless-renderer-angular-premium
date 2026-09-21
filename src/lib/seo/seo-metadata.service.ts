import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoMetadata } from '@jmgduarte/headless-core';
import { HEADLESS_PREMIUM_SEO_CONFIG } from './premium-seo-config';

@Injectable({ providedIn: 'root' })
export class SeoMetadataService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly config = inject(HEADLESS_PREMIUM_SEO_CONFIG);
  private readonly managed = new Set<string>();

  apply(metadata: SeoMetadata | undefined, fallbackTitle?: string): void {
    this.removeManaged();
    const title = fallbackTitle || metadata?.title;
    if (title) this.title.setTitle(title);
    if (metadata?.description) this.setName('description', metadata.description);
    const canonical = this.publicUrl(metadata?.canonical);
    if (canonical) this.setCanonical(canonical);
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

  private publicUrl(source: string | undefined): string | undefined {
    if (!source) return undefined;
    const frontendUrl = this.config.frontendUrl?.trim();
    if (!frontendUrl) return source;

    try {
      const base = new URL(frontendUrl);
      const sourceUrl = new URL(source);
      base.pathname = sourceUrl.pathname;
      base.search = sourceUrl.search;
      base.hash = sourceUrl.hash;
      return base.toString();
    } catch {
      return source;
    }
  }

  private setName(name: string, content: string | undefined): void {
    if (!content) return;
    this.meta.updateTag({ name, content });
    this.managed.add(`name|${name}`);
  }

  private setProperty(property: string, content: string | undefined): void {
    if (!content) return;
    this.meta.updateTag({ property, content });
    this.managed.add(`property|${property}`);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
    this.managed.add('canonical');
  }

  private removeManaged(): void {
    for (const key of this.managed) {
      if (key === 'canonical') this.document.head.querySelector('link[rel="canonical"]')?.remove();
      else {
        const [attribute, value] = key.split('|');
        this.meta.removeTag(`${attribute}="${value}"`);
      }
    }
    this.managed.clear();
  }
}
