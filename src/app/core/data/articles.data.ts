import { Article } from '../models/models';
import { IMG } from './images.data';

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    slug: 'routine-du-soir-en-cinq-gestes',
    title: 'La routine du soir en cinq gestes lents',
    excerpt: "Ralentir avant de dormir change tout. Voici comment construire un rituel du soir simple, sans superflu, qui prépare vraiment la peau à la nuit.",
    image: IMG.mistBathrobe,
    date: '2026-08-02',
    readingTime: 4,
    category: 'Rituel',
    content: [
      "Le soir n'est pas le moment de multiplier les étapes, mais de ralentir. Un rituel efficace tient souvent en cinq gestes, pas plus : démaquiller, nettoyer, tonifier, masser, nourrir.",
      "Le démaquillage vient en premier, à l'huile ou avec une brosse douce en bambou, pour retirer la journée sans agresser. Vient ensuite le nettoyage, avec une éponge konjac légèrement humidifiée, qui affine le grain de peau sans décaper.",
      "Le massage au gua sha ou au rouleau de jade prend alors toute sa place : quelques minutes suffisent pour relâcher la mâchoire et le front, souvent contractés sans qu'on s'en rende compte.",
      "Enfin, la crème de nuit se pose en dernier geste, en pressions légères plutôt qu'en frottements. Ce sont ces cinq minutes, répétées chaque soir, qui construisent une peau apaisée sur la durée — bien plus qu'un produit isolé.",
    ],
  },
  {
    id: 'a2',
    slug: 'comment-choisir-son-gua-sha',
    title: 'Comment choisir son gua sha selon sa peau',
    excerpt: "Quartz rose, jade ou obsidienne : chaque pierre a ses particularités. Un guide simple pour choisir l'outil qui correspond à votre peau et à votre rituel.",
    image: IMG.guaShaWoman,
    date: '2026-07-10',
    readingTime: 5,
    category: 'Guide',
    content: [
      "Le choix d'un gua sha dépend moins de la mode que de la sensation recherchée. Le quartz rose, doux et légèrement rosé, convient aux peaux sensibles et aux rituels du matin : sa fraîcheur est discrète, agréable au réveil.",
      "Le jade, plus frais encore, est traditionnellement associé à l'équilibre et convient à tous les types de peau. Sa teinte verte varie légèrement d'une pierre à l'autre, chaque exemplaire étant unique.",
      "L'obsidienne, plus dense et plus sombre, retient mieux la chaleur des mains. Elle trouve naturellement sa place dans les rituels du soir, où l'on recherche un geste plus enveloppant.",
      "Au-delà de la pierre, la forme compte aussi : un bord plus épais convient aux pressions profondes sur la mâchoire, un bord fin est préférable pour le contour des yeux. Le meilleur choix reste souvent celui qui donne envie d'être utilisé chaque jour.",
    ],
  },
  {
    id: 'a3',
    slug: 'entretenir-ses-accessoires-de-soin',
    title: 'Entretenir ses accessoires de soin dans la durée',
    excerpt: "Pierre, bambou, silicone : chaque matériau a ses règles d'entretien. Quelques gestes simples pour que vos accessoires durent des années.",
    image: IMG.flatLayTools,
    date: '2026-06-18',
    readingTime: 3,
    category: 'Entretien',
    content: [
      "Un accessoire de soin bien entretenu se conserve des années. La règle la plus simple : nettoyer après chaque usage, avec de l'eau tiède et un savon doux, jamais de produit abrasif.",
      "Les pierres comme le jade ou le quartz craignent les chocs thermiques : évitez de les rincer à l'eau très chaude après un usage à froid, ou de les laisser en plein soleil.",
      "Le bambou et le bois demandent à sécher à l'air libre, jamais immergés longtemps, pour ne pas gondoler. Les brosses, elles, gagnent à voir leur tête remplacée tous les trois mois environ.",
      "Enfin, une pochette en tissu dédiée protège des rayures pendant le rangement ou le transport. Ce sont ces petites habitudes, plus que la qualité initiale du matériau, qui déterminent la longévité d'un objet.",
    ],
  },
];

export function findArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
