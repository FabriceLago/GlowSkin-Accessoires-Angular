import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-livraison-retours',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './livraison-retours.html',
})
export class LivraisonRetoursComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly shippingOptions = [
    { zone: 'France métropolitaine', delay: '2 à 4 jours ouvrés', price: 'Offerte dès 49€ (sinon 4,90€)' },
    { zone: 'Belgique, Luxembourg, Suisse', delay: '3 à 5 jours ouvrés', price: '6,90€' },
    { zone: 'Union européenne', delay: '5 à 8 jours ouvrés', price: '9,90€' },
  ];

  readonly returnSteps = [
    { title: 'Faites votre demande', text: 'Contactez-nous depuis la page Contact en indiquant votre numéro de commande, dans les 30 jours suivant la réception.' },
    { title: 'Emballez le produit', text: "Replacez l'article non utilisé dans son emballage d'origine, avec tous ses accessoires." },
    { title: 'Expédiez le colis', text: "Utilisez l'étiquette de retour fournie et déposez le colis dans un point relais." },
    { title: 'Recevez votre remboursement', text: 'Le remboursement intervient sous 5 jours ouvrés après réception et contrôle du retour.' },
  ];

  ngOnInit(): void {
    this.seo.update({
      title: 'Livraison & retours',
      description: 'Délais, tarifs de livraison et modalités de retour chez GlowSkin Accessoires.',
    });
  }
}
