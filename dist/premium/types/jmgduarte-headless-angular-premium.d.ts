import * as i0 from '@angular/core';
import { InjectionToken, EnvironmentProviders } from '@angular/core';
import { PageSchema, SeoMetadata } from '@jmgduarte/headless-core';

declare class PremiumPageRendererComponent {
    readonly schema: i0.InputSignal<PageSchema>;
    readonly titleFormatter: i0.InputSignal<((title: string) => string) | undefined>;
    private readonly seo;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<PremiumPageRendererComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PremiumPageRendererComponent, "headless-premium-page-renderer", never, { "schema": { "alias": "schema"; "required": true; "isSignal": true; }; "titleFormatter": { "alias": "titleFormatter"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class SeoMetadataService {
    private readonly document;
    private readonly meta;
    private readonly title;
    private readonly config;
    private readonly managed;
    apply(metadata: SeoMetadata | undefined, fallbackTitle?: string): void;
    private publicUrl;
    private setName;
    private setProperty;
    private setCanonical;
    private removeManaged;
    static ɵfac: i0.ɵɵFactoryDeclaration<SeoMetadataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SeoMetadataService>;
}

interface PremiumSeoConfig {
    /** Public origin used for canonical and social URLs. */
    frontendUrl?: string;
}
declare const HEADLESS_PREMIUM_SEO_CONFIG: InjectionToken<PremiumSeoConfig>;
declare function withPremiumSeo(config?: PremiumSeoConfig): EnvironmentProviders;

export { HEADLESS_PREMIUM_SEO_CONFIG, PremiumPageRendererComponent, SeoMetadataService, withPremiumSeo };
export type { PremiumSeoConfig };
