import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/models';
import { WishlistService } from '../../core/services/wishlist.service';
import { UiService } from '../../core/services/ui.service';
import { RatingStarsComponent } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, RatingStarsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly featured = input(false);
  readonly wishlist = inject(WishlistService);
  readonly ui = inject(UiService);

  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.wishlist.toggle(this.product().id);
  }

  openQuickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.ui.openQuickView(this.product());
  }
}
