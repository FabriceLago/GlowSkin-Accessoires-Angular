import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  update(data: SeoData): void {
    const fullTitle = `${data.title} · GlowSkin Accessoires`;
    this.titleService.setTitle(fullTitle);
    this.metaService.updateTag({ name: 'description', content: data.description });
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: data.description });
    if (data.image) {
      this.metaService.updateTag({ property: 'og:image', content: data.image });
    }
  }
}
