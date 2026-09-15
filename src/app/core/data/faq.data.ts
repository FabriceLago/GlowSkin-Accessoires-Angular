import { FaqItem, Testimonial } from '../models/models';
import { IMG } from './images.data';

export const FAQ_ITEMS: FaqItem[] = [
  { id: 'f1', category: 'Commande', question: 'Combien de temps faut-il pour recevoir ma commande ?', answer: "Les commandes sont expédiées sous 24 à 48h ouvrées. Comptez ensuite 2 à 4 jours de livraison en France métropolitaine, et 5 à 8 jours pour le reste de l'Europe." },
  { id: 'f2', category: 'Commande', question: 'Puis-je modifier ou annuler ma commande ?', answer: "Vous pouvez modifier ou annuler votre commande dans l'heure suivant sa validation en nous contactant directement. Passé ce délai, la préparation est déjà lancée." },
  { id: 'f3', category: 'Livraison', question: 'La livraison est-elle vraiment offerte ?', answer: "Oui, dès 49€ d'achat, la livraison standard est offerte en France métropolitaine. En dessous de ce montant, des frais de 4,90€ s'appliquent." },
  { id: 'f4', category: 'Livraison', question: "Livrez-vous à l'international ?", answer: "Nous livrons dans toute l'Union européenne, en Suisse et au Royaume-Uni. Les délais et frais varient selon la destination, affichés au moment du paiement." },
  { id: 'f5', category: 'Retours', question: 'Quelle est votre politique de retour ?', answer: "Vous disposez de 30 jours après réception pour retourner un article non utilisé, dans son emballage d'origine. Le remboursement intervient sous 5 jours ouvrés après réception du colis." },
  { id: 'f6', category: 'Retours', question: 'Qui prend en charge les frais de retour ?', answer: "Les frais de retour sont à la charge de la cliente ou du client, sauf en cas d'erreur de notre part ou de produit défectueux, où ils sont intégralement remboursés." },
  { id: 'f7', category: 'Produits', question: 'Vos accessoires conviennent-ils aux peaux sensibles ?', answer: "Oui, nos matériaux naturels — jade, quartz, konjac, coton bio — sont sélectionnés pour leur douceur. En cas de doute, testez toujours sur une petite zone avant un usage complet." },
  { id: 'f8', category: 'Produits', question: 'Les pierres de gua sha et rouleaux sont-elles garanties authentiques ?', answer: "Chaque pierre est sélectionnée et certifiée par nos fournisseurs pour son authenticité. De légères variations de teinte ou de veinure sont normales et témoignent de leur origine naturelle." },
  { id: 'f9', category: 'Paiement', question: 'Quels moyens de paiement acceptez-vous ?', answer: "Carte bancaire, PayPal et paiement en 3 fois sans frais dès 60€ d'achat sont disponibles au moment du paiement." },
  { id: 'f10', category: 'Paiement', question: 'Le paiement en plusieurs fois est-il sans frais ?', answer: "Oui, le paiement en 3 fois proposé sur notre site ne comporte aucun frais supplémentaire, quel que soit le montant de la commande éligible." },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Camille', role: 'Cliente depuis 2025', quote: "Le rituel du soir avec le gua sha est devenu un vrai moment pour moi. Cinq minutes qui changent toute la soirée.", rating: 5, image: IMG.portraitFreckles1 },
  { id: 't2', name: 'Louise', role: 'Cliente depuis 2024', quote: "La qualité des matériaux se sent immédiatement. Rien à voir avec les rouleaux en plastique que j'avais avant.", rating: 5, image: IMG.portraitFreckles2 },
  { id: 't3', name: 'Anaëlle', role: 'Cliente depuis 2026', quote: "J'ai offert le kit rituel à ma mère, elle ne s'en sépare plus. L'emballage à lui seul donne envie.", rating: 5, image: IMG.portraitFreckles3 },
];
