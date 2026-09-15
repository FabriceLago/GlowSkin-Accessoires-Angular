import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTICLES } from '../../core/data/articles.data';
import { SeoService } from '../../core/services/seo.service';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [RouterLink, FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journal.html',
})
export class JournalComponent implements OnInit {
  private readonly seo = inject(SeoService);
  readonly articles = ARTICLES;

  ngOnInit(): void {
    this.seo.update({
      title: 'Journal',
      description: 'Conseils, guides et réflexions autour du rituel beauté naturel GlowSkin Accessoires.',
    });
  }
}
