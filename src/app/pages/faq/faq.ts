import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FAQ_ITEMS } from '../../core/data/faq.data';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
})
export class FaqComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly items = FAQ_ITEMS;
  readonly openId = signal<string | null>(null);

  readonly categories = computed(() => [...new Set(this.items.map((i) => i.category))]);

  itemsByCategory(category: string) {
    return this.items.filter((i) => i.category === category);
  }

  toggle(id: string): void {
    this.openId.set(this.openId() === id ? null : id);
  }

  ngOnInit(): void {
    this.seo.update({
      title: 'FAQ',
      description: 'Toutes les réponses à vos questions sur les commandes, livraisons, retours et produits GlowSkin Accessoires.',
    });
  }
}
