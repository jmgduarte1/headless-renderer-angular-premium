import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface PremiumSeoConfig {
  /** Public origin used for canonical and social URLs. */
  frontendUrl?: string;
}

export const HEADLESS_PREMIUM_SEO_CONFIG = new InjectionToken<PremiumSeoConfig>(
  'HEADLESS_PREMIUM_SEO_CONFIG',
  { factory: () => ({}) },
);

export function withPremiumSeo(config: PremiumSeoConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HEADLESS_PREMIUM_SEO_CONFIG,
      useValue: config,
    },
  ]);
}
