import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-cgv',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cgv.html',
})
export class CgvComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly sections = [
    { title: '1. Objet', text: "Les présentes conditions générales de vente régissent les relations contractuelles entre GlowSkin Accessoires et toute personne effectuant un achat sur le site." },
    { title: '2. Produits', text: "Les accessoires proposés sont décrits avec la plus grande précision possible. De légères variations naturelles (teinte, veinure) peuvent exister sur les produits en pierre naturelle." },
    { title: '3. Prix', text: "Les prix sont indiqués en euros, toutes taxes comprises. GlowSkin Accessoires se réserve le droit de modifier ses prix à tout moment, les produits étant facturés sur la base du tarif en vigueur au moment de la commande." },
    { title: '4. Commande', text: "Toute commande passée sur le site vaut acceptation des présentes conditions générales de vente. Une confirmation est envoyée par e-mail après validation du paiement." },
    { title: '5. Paiement', text: "Le paiement s'effectue en ligne par carte bancaire, PayPal, ou en 3 fois sans frais dès 60€ d'achat, au moment de la commande." },
    { title: '6. Livraison', text: "Les délais et modalités de livraison sont détaillés sur notre page Livraison &amp; retours. GlowSkin Accessoires ne saurait être tenue responsable des retards imputables au transporteur." },
    { title: '7. Droit de rétractation', text: "Conformément à la loi, vous disposez d'un délai de 30 jours à compter de la réception pour retourner un article non utilisé et obtenir un remboursement." },
    { title: '8. Données personnelles', text: "Les données collectées sont utilisées exclusivement pour le traitement des commandes et, sous réserve de consentement, l'envoi de notre newsletter." },
  ];

  ngOnInit(): void {
    this.seo.update({
      title: 'CGV',
      description: 'Conditions générales de vente de GlowSkin Accessoires.',
    });
  }
}
