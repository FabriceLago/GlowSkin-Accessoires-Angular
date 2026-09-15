import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center gap-0.5" [attr.aria-label]="'Note ' + rating() + ' sur 5'">
      @for (star of stars(); track $index) {
        <svg viewBox="0 0 20 20" [attr.width]="size()" [attr.height]="size()" fill="none" aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.9l-5.3 2.7 1.1-5.9-4.3-4.1 5.9-.7L10 1.5z"
            [attr.fill]="star === 'full' ? '#C9A24D' : star === 'half' ? 'url(#half)' : 'none'"
            [attr.stroke]="'#C9A24D'"
            stroke-width="1"
          />
        </svg>
      }
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stop-color="#C9A24D" />
            <stop offset="50%" stop-color="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  `,
})
export class RatingStarsComponent {
  readonly rating = input(0);
  readonly size = input(16);

  readonly stars = computed(() => {
    const r = this.rating();
    const result: Array<'full' | 'half' | 'empty'> = [];
    for (let i = 1; i <= 5; i++) {
      if (r >= i) result.push('full');
      else if (r >= i - 0.5) result.push('half');
      else result.push('empty');
    }
    return result;
  });
}
