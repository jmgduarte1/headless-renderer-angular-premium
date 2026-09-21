import { Component, inject, input, OnChanges, effect } from '@angular/core';
import { PageSchema } from '@jmgduarte/headless-core';
import { HeadlessPageRendererComponent } from '@jmgduarte/headless-angular';
import { SeoMetadataService } from '../seo/seo-metadata.service';

@Component({
  selector: 'headless-premium-page-renderer',
  imports: [HeadlessPageRendererComponent],
  template: '<headless-page-renderer [schema]="schema()" />',
})
// export class PremiumPageRendererComponent implements OnChanges {
export class PremiumPageRendererComponent {
  readonly schema = input.required<PageSchema>();
  readonly titleFormatter = input<(title: string) => string>();
  private readonly seo = inject(SeoMetadataService);

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
}
