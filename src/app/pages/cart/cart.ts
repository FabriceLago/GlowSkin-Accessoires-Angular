import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {
  readonly cart = inject(CartService);
  private readonly seo = inject(SeoService);

  readonly promoInput = signal('');
  readonly promoError = signal(false);

  readonly shippingCost = computed(() => (this.cart.amountToFreeShipping() > 0 ? 4.9 : 0));
  readonly orderTotal = computed(() => this.cart.total() + this.shippingCost());

  ngOnInit(): void {
    this.seo.update({
      title: 'Panier',
      description: 'Votre panier GlowSkin Accessoires.',
    });
  }

  variantLabel(productId: string, variantId: string): string {
    const item = this.cart.items().find((i) => i.product.id === productId && i.variantId === variantId);
    return item?.product.variants.find((v) => v.id === variantId)?.label ?? '';
  }

  applyPromo(): void {
    const success = this.cart.applyPromoCode(this.promoInput());
    this.promoError.set(!success);
    if (success) this.promoInput.set('');
  }
}
