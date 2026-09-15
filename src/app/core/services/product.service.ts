import { Injectable, signal } from '@angular/core';
import { PRODUCTS } from '../data/products.data';
import { Product } from '../models/models';

export interface BoutiqueFilters {
  categories: string[];
  materials: string[];
  minPrice: number;
  maxPrice: number;
  sort: 'popularite' | 'prix-asc' | 'prix-desc' | 'nouveautes';
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products: Product[] = PRODUCTS;
  readonly searchQuery = signal('');

  getBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  getBestSellers(): Product[] {
    return this.products.filter((p) => p.isBestSeller);
  }

  getRelated(product: Product, count = 4): Product[] {
    return this.products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .concat(this.products.filter((p) => p.id !== product.id && p.category !== product.category))
      .slice(0, count);
  }

  filterAndSort(filters: BoutiqueFilters): Product[] {
    let result = this.products.filter((p) => {
      const inCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
      const inMaterial = filters.materials.length === 0 || filters.materials.includes(p.material);
      const inPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      return inCategory && inMaterial && inPrice;
    });

    switch (filters.sort) {
      case 'prix-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'prix-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'nouveautes':
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result = [...result].sort((a, b) => b.rating - a.rating);
    }
    return result;
  }

  search(query: string): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.materialLabel.toLowerCase().includes(q)
    );
  }
}
