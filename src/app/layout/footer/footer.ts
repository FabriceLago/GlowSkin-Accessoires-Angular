import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly email = signal('');
  readonly submitted = signal(false);

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.email().includes('@')) {
      this.submitted.set(true);
      this.email.set('');
    }
  }
}
