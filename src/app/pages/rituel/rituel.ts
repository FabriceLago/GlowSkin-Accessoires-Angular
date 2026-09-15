import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { IMG } from '../../core/data/images.data';

@Component({
  selector: 'app-rituel',
  standalone: true,
  imports: [RouterLink, FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rituel.html',
})
export class RituelComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly IMG = IMG;

  readonly commitments = [
    { title: 'Matériaux nobles', text: 'Jade, quartz, bambou, konjac — des matières sélectionnées pour leur origine et leur toucher, jamais pour leur coût.' },
    { title: 'Fabrication artisanale', text: "Chaque pierre est taillée et polie à la main, ce qui explique les légères variations d'une pièce à l'autre." },
    { title: 'Sans promesse médicale', text: "Nous parlons de rituel et de bien-être, jamais de résultats cliniques. Le geste prime sur la promesse." },
    { title: 'Gestes lents', text: "Nos produits sont pensés pour ralentir, pas pour optimiser. Trois minutes par jour suffisent." },
  ];

  readonly methodSteps = [
    { number: '01', title: 'Dégager', text: "Un bandeau, un instant pour se préparer. Ce premier geste signale au corps qu'un temps pour soi commence." },
    { number: '02', title: 'Drainer', text: "Gua sha ou rouleau, en pressions lentes et répétées. La régularité compte plus que l'intensité du geste." },
    { number: '03', title: 'Sceller', text: "Un dernier passage frais referme le rituel, avant de reprendre le cours de la journée ou de rejoindre le sommeil." },
  ];

  ngOnInit(): void {
    this.seo.update({
      title: 'Le Rituel',
      description: "Découvrez la méthode GlowSkin en trois gestes et notre engagement pour un rituel beauté naturel et sensoriel.",
      image: IMG.handLotionRoller.url,
    });
  }
}
