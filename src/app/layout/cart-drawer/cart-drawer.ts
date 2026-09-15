import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-drawer.html',
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);

  variantLabel(productId: string, variantId: string): string {
    const item = this.cart.items().find((i) => i.product.id === productId && i.variantId === variantId);
    return item?.product.variants.find((v) => v.id === variantId)?.label ?? '';
  }
}
