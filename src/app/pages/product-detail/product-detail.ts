import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { SeoService } from '../../core/services/seo.service';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { Product } from '../../core/models/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, RatingStarsComponent, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly seo = inject(SeoService);
  readonly cart = inject(CartService);
  readonly wishlist = inject(WishlistService);

  readonly product = signal<Product | undefined>(undefined);
  readonly activeImageIndex = signal(0);
  readonly selectedVariantId = signal<string | null>(null);
  readonly quantity = signal(1);
  readonly activeTab = signal<'description' | 'utilisation' | 'entretien' | 'avis'>('description');
  readonly justAdded = signal(false);
  readonly isZoomed = signal(false);

  readonly relatedProducts = computed(() => {
    const p = this.product();
    return p ? this.productService.getRelated(p) : [];
  });

  readonly ratingDistribution = computed(() => {
    const p = this.product();
    if (!p) return [];
    const counts = [0, 0, 0, 0, 0];
    for (const review of p.reviews) {
      const idx = Math.round(review.rating) - 1;
      if (idx >= 0 && idx < 5) counts[idx]++;
    }
    const total = p.reviews.length || 1;
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      percent: (counts[star - 1] / total) * 100,
      count: counts[star - 1],
    }));
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      const found = slug ? this.productService.getBySlug(slug) : undefined;
      this.product.set(found);
      if (found) {
        this.activeImageIndex.set(0);
        this.selectedVariantId.set(found.variants[0]?.id ?? null);
        this.quantity.set(1);
        this.activeTab.set('description');
        this.justAdded.set(false);
        this.seo.update({
          title: found.name,
          description: found.shortDescription,
          image: found.images[0]?.url,
        });
      }
    });
  }

  selectImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  toggleZoom(): void {
    this.isZoomed.update((v) => !v);
  }

  decreaseQuantity(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  increaseQuantity(): void {
    this.quantity.update((q) => q + 1);
  }

  addToCart(): void {
    const p = this.product();
    const variantId = this.selectedVariantId();
    if (!p || !variantId) return;
    this.cart.addItem(p, variantId, this.quantity());
    this.justAdded.set(true);
    this.cart.openDrawer();
  }
}
