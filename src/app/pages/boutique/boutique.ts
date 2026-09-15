import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { SeoService } from '../../core/services/seo.service';
import { CATEGORIES, MATERIALS } from '../../core/data/products.data';
import { ProductCardComponent } from '../../shared/product-card/product-card';

const PAGE_SIZE = 8;

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './boutique.html',
})
export class BoutiqueComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly wishlist = inject(WishlistService);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly categories = CATEGORIES;
  readonly materials = MATERIALS;

  readonly selectedCategories = signal<string[]>([]);
  readonly selectedMaterials = signal<string[]>([]);
  readonly minPrice = signal(0);
  readonly maxPrice = signal(100);
  readonly sort = signal<'popularite' | 'prix-asc' | 'prix-desc' | 'nouveautes'>('popularite');
  readonly wishlistOnly = signal(false);
  readonly currentPage = signal(1);
  readonly isFiltersOpen = signal(false);

  readonly filteredProducts = computed(() => {
    let result = this.productService.filterAndSort({
      categories: this.selectedCategories(),
      materials: this.selectedMaterials(),
      minPrice: this.minPrice(),
      maxPrice: this.maxPrice(),
      sort: this.sort(),
    });
    if (this.wishlistOnly()) {
      const ids = this.wishlist.ids();
      result = result.filter((p) => ids.has(p.id));
    }
    return result;
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredProducts().length / PAGE_SIZE)));

  readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly pagedProducts = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filteredProducts().slice(start, start + PAGE_SIZE);
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Boutique',
      description: 'Découvrez tous les accessoires de soin GlowSkin : rouleaux de jade, gua sha, brosses, masques LED et kits rituels.',
    });
    this.wishlistOnly.set(this.route.snapshot.queryParamMap.get('wishlist') === '1');
  }

  toggleCategory(value: string): void {
    this.selectedCategories.update((list) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
    this.currentPage.set(1);
  }

  toggleMaterial(value: string): void {
    this.selectedMaterials.update((list) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
    this.currentPage.set(1);
  }

  onSortChange(value: string): void {
    this.sort.set(value as 'popularite' | 'prix-asc' | 'prix-desc' | 'nouveautes');
    this.currentPage.set(1);
  }

  onMaxPriceChange(value: number): void {
    this.maxPrice.set(value);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.selectedCategories.set([]);
    this.selectedMaterials.set([]);
    this.maxPrice.set(100);
    this.wishlistOnly.set(false);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
