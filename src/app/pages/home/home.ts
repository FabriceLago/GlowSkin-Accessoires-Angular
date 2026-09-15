import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/services/seo.service';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { RatingStarsComponent } from '../../shared/rating-stars/rating-stars';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { IMG } from '../../core/data/images.data';
import { TESTIMONIALS } from '../../core/data/faq.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, RatingStarsComponent, FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly seo = inject(SeoService);

  readonly IMG = IMG;
  readonly testimonials = TESTIMONIALS;
  readonly bestSellers = this.productService.getBestSellers();

  readonly reassurance = [
    'Livraison offerte dès 49€',
    'Paiement en 3x sans frais',
    'Retours gratuits sous 30 jours',
    'Matériaux naturels sélectionnés',
  ];

  readonly reassuranceStrip = Array.from({ length: 5 }, () => this.reassurance).flat();

  readonly ritualSteps = [
    { number: '01', title: 'Dégager', text: "Placez le bandeau, dégagez le visage. Le rituel commence avant même le premier geste de soin, dans la façon de se rendre disponible." },
    { number: '02', title: 'Drainer', text: "Gua sha ou rouleau de jade, en pression lente du centre vers l'extérieur. Le geste compte plus que la force : trois minutes suffisent." },
    { number: '03', title: 'Sceller', text: "Un dernier passage frais referme le rituel et prépare la peau pour la journée ou la nuit à venir, sans jamais tirer sur les tissus." },
  ];

  readonly materials = [
    { name: 'Jade', desc: 'Frais au toucher, associé à l\'équilibre et à la longévité dans les rituels ancestraux.', image: IMG.flatLayLinenRoller },
    { name: 'Quartz rose', desc: 'Doux et légèrement rosé, apprécié pour les peaux sensibles et les gestes du matin.', image: IMG.guaShaWoman },
    { name: 'Bambou', desc: 'Léger et chaleureux, il habille nos brosses et rouleaux d\'une touche artisanale.', image: IMG.flatLayTools },
    { name: 'Konjac', desc: 'Fibre végétale gorgée d\'eau, pour un nettoyage tout en délicatesse au pH neutre.', image: IMG.flatLayClear },
  ];

  readonly instagramImages = [
    IMG.heroJadeRollerFace, IMG.flatLayLeaves, IMG.guaShaHandGreen,
    IMG.shelfPlant, IMG.eucalyptusBunch, IMG.portraitFreckles3,
  ];

  readonly beforeAfterPosition = signal(50);
  readonly newsletterEmail = signal('');
  readonly newsletterSubmitted = signal(false);

  ngOnInit(): void {
    this.seo.update({
      title: 'Accueil',
      description: "GlowSkin Accessoires — rouleaux de jade, gua sha, brosses nettoyantes et rituels de soin naturels. Le geste avant le produit.",
      image: IMG.heroJadeRollerFace.url,
    });
  }

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    if (this.newsletterEmail().includes('@')) {
      this.newsletterSubmitted.set(true);
      this.newsletterEmail.set('');
    }
  }
}
