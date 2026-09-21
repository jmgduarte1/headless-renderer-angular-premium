# `@jmgduarte/headless-angular-premium`

Premium Angular capabilities that extend the Free renderer while consuming the same framework-neutral Core contracts. Premium remains a separate opt-in package; it is not exported from `@jmgduarte/headless-angular`.

## Included capability

- `PremiumPageRendererComponent` wraps the Free `HeadlessPageRendererComponent` and applies SEO metadata through Angular's `Title` and `Meta` APIs.
- `SeoMetadataService` handles title, description, canonical, robots, Open Graph, and Twitter metadata from Core's `SeoMetadata` contract.
- `withPremiumSeo({ frontendUrl })` returns Angular environment providers for the Premium SEO feature. When configured, the public frontend origin replaces the source origin for canonical and `og:url`, preserving the URL path, query, and fragment.

## Setup

Install both this package and `@jmgduarte/headless-angular`, then register the feature with the Free provider and import the Premium component where it is used:

```ts
import { provideHeadlessAngular } from '@jmgduarte/headless-angular';
import { withPremiumSeo } from '@jmgduarte/headless-angular-premium';

provideHeadlessAngular(
  { contentClient, renderPageTitle: false },
  withPremiumSeo({ frontendUrl: 'https://www.example.com' }),
);
```

```ts
import { PremiumPageRendererComponent } from '@jmgduarte/headless-angular-premium';

@Component({
  imports: [PremiumPageRendererComponent],
  template: '<headless-premium-page-renderer [schema]="page" />',
})
export class PremiumPageView {}
```

`withPremiumSeo()` is optional; without a configured frontend origin, source canonical and social URLs are retained. The package depends on both Free Angular and Core, while neither dependency points back to Premium.

## Local development

From this directory:

```sh
npm install
npm run typecheck
npm test
npm run build
```

`npm test` runs the Angular library tests in non-watch mode. This package is currently private and uses sibling local package paths in the development workspace.
