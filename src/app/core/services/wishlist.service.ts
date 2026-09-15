import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'glowskin-wishlist-v1';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly idsSignal = signal<Set<string>>(new Set());
  readonly ids = this.idsSignal.asReadonly();
  readonly count = computed(() => this.idsSignal().size);

  constructor() {
    this.restore();
  }

  isWishlisted(productId: string): boolean {
    return this.idsSignal().has(productId);
  }

  toggle(productId: string): void {
    const next = new Set(this.idsSignal());
    if (next.has(productId)) {
      next.delete(productId);
    } else {
      next.add(productId);
    }
    this.idsSignal.set(next);
    this.persist();
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.idsSignal()]));
  }

  private restore(): void {
    if (typeof localStorage === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const ids: string[] = JSON.parse(raw);
      this.idsSignal.set(new Set(ids));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
