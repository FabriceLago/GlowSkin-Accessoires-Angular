import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ARTICLES, findArticleBySlug } from '../../core/data/articles.data';
import { SeoService } from '../../core/services/seo.service';
import { Article } from '../../core/models/models';

@Component({
  selector: 'app-journal-article',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journal-article.html',
})
export class JournalArticleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly article = signal<Article | undefined>(undefined);
  readonly relatedArticles = computed(() => {
    const current = this.article();
    return ARTICLES.filter((a) => a.id !== current?.id).slice(0, 2);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      const found = slug ? findArticleBySlug(slug) : undefined;
      this.article.set(found);
      if (found) {
        this.seo.update({
          title: found.title,
          description: found.excerpt,
          image: found.image.url,
        });
      }
    });
  }
}
