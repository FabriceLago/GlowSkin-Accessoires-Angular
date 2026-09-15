import { Injectable, signal } from '@angular/core';
import { Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UiService {
  readonly isMobileMenuOpen = signal(false);
  readonly isSearchOpen = signal(false);
  readonly quickViewProduct = signal<Product | null>(null);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleSearch(): void {
    this.isSearchOpen.update((v) => !v);
  }

  closeSearch(): void {
    this.isSearchOpen.set(false);
  }

  openQuickView(product: Product): void {
    this.quickViewProduct.set(product);
  }

  closeQuickView(): void {
    this.quickViewProduct.set(null);
  }
}
