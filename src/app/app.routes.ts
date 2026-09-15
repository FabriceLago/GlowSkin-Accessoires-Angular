import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'boutique',
    loadComponent: () => import('./pages/boutique/boutique').then((m) => m.BoutiqueComponent),
  },
  {
    path: 'produit/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetailComponent),
  },
  {
    path: 'le-rituel',
    loadComponent: () => import('./pages/rituel/rituel').then((m) => m.RituelComponent),
  },
  {
    path: 'journal',
    loadComponent: () => import('./pages/journal/journal').then((m) => m.JournalComponent),
  },
  {
    path: 'journal/:slug',
    loadComponent: () =>
      import('./pages/journal-article/journal-article').then((m) => m.JournalArticleComponent),
  },
  {
    path: 'panier',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.CartComponent),
  },
  {
    path: 'commande',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.CheckoutComponent),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.FaqComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.ContactComponent),
  },
  {
    path: 'cgv',
    loadComponent: () => import('./pages/cgv/cgv').then((m) => m.CgvComponent),
  },
  {
    path: 'livraison-retours',
    loadComponent: () =>
      import('./pages/livraison-retours/livraison-retours').then((m) => m.LivraisonRetoursComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
