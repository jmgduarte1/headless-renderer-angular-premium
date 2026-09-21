import { describe, expect, it } from 'vitest';
import { PremiumPageRendererComponent } from './premium-page-renderer.component';

describe('PremiumPageRendererComponent', () => {
  it('exposes the Premium wrapper around the Free page renderer', () => {
    expect(PremiumPageRendererComponent).toBeTruthy();
  });
});
