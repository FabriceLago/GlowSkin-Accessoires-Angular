export interface CuratedImage {
  url: string;
  alt: string;
}

function unsplash(id: string, w = 1600): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const IMG = {
  heroJadeRollerFace: { url: unsplash('photo-1775642548888-7183ff686cb6', 1800), alt: "Une femme utilise un rouleau de jade sur son visage à la lumière naturelle du matin" },
  serumPipette: { url: unsplash('photo-1655026392641-bf283a5f12d4'), alt: "Une main applique une goutte de sérum facial à partir d'une pipette en verre" },
  serumCheek: { url: unsplash('photo-1670201203208-055d6d79db4a'), alt: "Une personne applique un sérum sur sa joue dans la lumière du matin" },
  mistBathrobe: { url: unsplash('photo-1599847987657-881f11b92a75'), alt: "Une femme en peignoir blanc vaporise une brume faciale dans une salle de bain baignée de lumière" },
  handLotionRoller: { url: unsplash('photo-1586220742613-b731f66f7743'), alt: "Une main applique une lotion, rouleau de jade et gua sha posés à proximité" },

  flatLayLinenRoller: { url: unsplash('photo-1598440947619-2c35fc9aa908'), alt: "Rouleau de jade vert posé sur une serviette en lin rayée" },
  flatLayLeaves: { url: unsplash('photo-1748543668751-902d6461890d'), alt: "Produits de soin disposés avec des feuilles vertes sur une surface beige naturelle" },
  flatLayPebbles: { url: unsplash('photo-1612817288484-6f916006741a'), alt: "Produits de soin entourés de galets de rivière lisses et de branchages" },
  flatLayTools: { url: unsplash('photo-1653784097013-786a8965ea3b'), alt: "Assortiment d'outils de beauté disposés sur une table en lumière naturelle" },
  flatLayClear: { url: unsplash('photo-1748543668676-ea8241cb3886'), alt: "Produits de soin de la peau posés sur un fond clair avec feuillage discret" },

  shelfWood: { url: unsplash('photo-1749137315696-3590c111e495'), alt: "Produits de soin disposés sur une étagère en bois clair" },
  shelfShower: { url: unsplash('photo-1749137315807-036403c62107'), alt: "Flacons de soin posés sur une étagère sous la douche, lumière du matin" },
  shelfPlant: { url: unsplash('photo-1780952934157-f541e70c7ece'), alt: "Flacons cosmétiques sur étagère en bois avec une plante verte" },
  shelfDisplay: { url: unsplash('photo-1749137315928-bc96451fa4c0'), alt: "Produits de beauté soigneusement exposés sur une étagère en lumière naturelle" },

  guaShaHandDark: { url: unsplash('photo-1610924750839-daccc90fd53c'), alt: "Une main tient une pierre de gua sha brune et noire" },
  guaShaHandGreen: { url: unsplash('photo-1763228521563-282794879b6c'), alt: "Des mains tiennent un objet lisse et vert à la texture de pierre" },
  guaShaWoman: { url: unsplash('photo-1605264965519-fc3f32a90113'), alt: "Une femme tient une pierre de gua sha marron et noire près de son visage" },

  eucalyptusClose: { url: unsplash('photo-1611255550543-b5ecb01dfddc'), alt: "Gros plan sur des feuilles d'eucalyptus vert, texture organique" },
  eucalyptusLeaf: { url: unsplash('photo-1512716679859-da19b4af9c38'), alt: "Feuillage vert en gros plan sur fond naturel" },
  eucalyptusBunch: { url: unsplash('photo-1680887644969-6d4ff308f779'), alt: "Bouquet de feuilles vertes en gros plan pour un rituel bain" },

  clayBowlHand: { url: unsplash('photo-1590605095243-072811dbe64c'), alt: "Une main tient un bol en argile blanche brute" },
  clayVases: { url: unsplash('photo-1520408222757-6f9f95d87d5d'), alt: "Vases en argile blanche brute posés sur une table en bois" },
  clayHandsShaping: { url: unsplash('photo-1771523350747-638a89667c8f'), alt: "Des mains couvertes d'argile façonnant une pièce de poterie artisanale" },

  portraitFreckles1: { url: unsplash('photo-1554151228-14d9def656e4'), alt: "Portrait naturel d'une femme aux taches de rousseur, la main sur le menton" },
  portraitFreckles2: { url: unsplash('photo-1489424731084-a5d8b219a5bb'), alt: "Portrait naturel d'une femme souriante aux taches de rousseur visibles" },
  portraitFreckles3: { url: unsplash('photo-1713207524097-596f3c17afc3'), alt: "Portrait naturel d'une femme aux cheveux auburn et taches de rousseur sur fond beige" },

  brushesShelf: { url: unsplash('photo-1784098480775-54c1be00b6e6'), alt: "Pinceaux et produits de soin disposés sur une étagère de salle de bain en bois" },
  brushesSet: { url: unsplash('photo-1622364649682-e7af9fecc43d'), alt: "Ensemble de pinceaux de maquillage brun et argenté posés sur un textile de lin" },

  headbandSpa: { url: unsplash('photo-1608625100285-e95b9f843bce'), alt: "Bandeau spa rose et blanc posé sur un textile naturel" },
} as const;

export type ImageKey = keyof typeof IMG;
