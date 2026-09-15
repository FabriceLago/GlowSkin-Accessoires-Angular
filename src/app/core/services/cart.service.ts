import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/models';

const STORAGE_KEY = 'glowskin-cart-v1';
const FREE_SHIPPING_THRESHOLD = 49;

interface StoredItem {
  productId: string;
  variantId: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);
  readonly isDrawerOpen = signal(false);
  readonly promoCode = signal<string | null>(null);

  readonly items = this.itemsSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly discount = computed(() => {
    if (this.promoCode() === 'GLOW10') {
      return this.subtotal() * 0.1;
    }
    return 0;
  });

  readonly total = computed(() => Math.max(0, this.subtotal() - this.discount()));

  readonly freeShippingThreshold = FREE_SHIPPING_THRESHOLD;

  readonly amountToFreeShipping = computed(() =>
    Math.max(0, FREE_SHIPPING_THRESHOLD - this.subtotal())
  );

  readonly freeShippingProgress = computed(() =>
    Math.min(100, (this.subtotal() / FREE_SHIPPING_THRESHOLD) * 100)
  );

  private allProducts: Product[] = [];

  init(products: Product[]): void {
    this.allProducts = products;
    this.restore();
  }

  addItem(product: Product, variantId: string, quantity = 1): void {
    const items = [...this.itemsSignal()];
    const existing = items.find((i) => i.product.id === product.id && i.variantId === variantId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, variantId, quantity });
    }
    this.itemsSignal.set(items);
    this.persist();
  }

  removeItem(productId: string, variantId: string): void {
    this.itemsSignal.set(
      this.itemsSignal().filter((i) => !(i.product.id === productId && i.variantId === variantId))
    );
    this.persist();
  }

  updateQuantity(productId: string, variantId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId, variantId);
      return;
    }
    this.itemsSignal.set(
      this.itemsSignal().map((i) =>
        i.product.id === productId && i.variantId === variantId ? { ...i, quantity } : i
      )
    );
    this.persist();
  }

  applyPromoCode(code: string): boolean {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'GLOW10') {
      this.promoCode.set(normalized);
      return true;
    }
    return false;
  }

  removePromoCode(): void {
    this.promoCode.set(null);
  }

  clearCart(): void {
    this.itemsSignal.set([]);
    this.promoCode.set(null);
    this.persist();
  }

  openDrawer(): void {
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') return;
    const stored: StoredItem[] = this.itemsSignal().map((i) => ({
      productId: i.product.id,
      variantId: i.variantId,
      quantity: i.quantity,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }

  private restore(): void {
    if (typeof localStorage === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const stored: StoredItem[] = JSON.parse(raw);
      const items: CartItem[] = [];
      for (const entry of stored) {
        const product = this.allProducts.find((p) => p.id === entry.productId);
        if (product) {
          items.push({ product, variantId: entry.variantId, quantity: entry.quantity });
        }
      }
      this.itemsSignal.set(items);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
