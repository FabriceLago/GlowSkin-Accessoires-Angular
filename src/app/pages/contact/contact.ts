import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
})
export class ContactComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly form = signal<ContactForm>({ name: '', email: '', subject: '', message: '' });
  readonly isSubmitted = signal(false);

  update<K extends keyof ContactForm>(key: K, value: string): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const f = this.form();
    if (f.name && f.email && f.message) {
      this.isSubmitted.set(true);
    }
  }

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact',
      description: "Une question sur un produit, une commande ou notre marque ? L'équipe GlowSkin Accessoires vous répond.",
    });
  }
}
