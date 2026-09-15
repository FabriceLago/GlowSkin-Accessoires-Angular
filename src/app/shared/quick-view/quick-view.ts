import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiService } from '../../core/services/ui.service';
import { CartService } from '../../core/services/cart.service';
import { RatingStarsComponent } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [RouterLink, RatingStarsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quick-view.html',
})
export class QuickViewComponent {
  readonly ui = inject(UiService);
  readonly cart = inject(CartService);

  readonly selectedVariantId = signal<string | null>(null);
  readonly quantity = signal(1);
  readonly justAdded = signal(false);

  readonly product = this.ui.quickViewProduct;

  constructor() {
    effect(() => {
      const p = this.product();
      if (p) {
        this.selectedVariantId.set(p.variants[0]?.id ?? null);
        this.quantity.set(1);
        this.justAdded.set(false);
      }
    });
  }

  close(): void {
    this.ui.closeQuickView();
  }

  decreaseQuantity(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToCart(): void {
    const p = this.product();
    const variantId = this.selectedVariantId();
    if (!p || !variantId) return;
    this.cart.addItem(p, variantId, this.quantity());
    this.justAdded.set(true);
  }
}
