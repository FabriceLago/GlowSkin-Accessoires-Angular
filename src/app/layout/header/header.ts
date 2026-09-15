import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { UiService } from '../../core/services/ui.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
})
export class HeaderComponent {
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);
  readonly ui = inject(UiService);
  private readonly productService = inject(ProductService);

  readonly searchTerm = signal('');
  readonly searchResults = computed(() => this.productService.search(this.searchTerm()));

  readonly navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/boutique', label: 'Boutique' },
    { path: '/le-rituel', label: 'Le Rituel' },
    { path: '/journal', label: 'Journal' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
  }

  closeSearchAndReset(): void {
    this.ui.closeSearch();
    this.searchTerm.set('');
  }
}
