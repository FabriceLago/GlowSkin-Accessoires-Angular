import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true,
})
export class FadeUpDirective implements AfterViewInit, OnDestroy {
  readonly delay = input<number | string>(0, { alias: 'appFadeUp' });
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('fade-up-init');

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('fade-up-in');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const delayMs = Number(this.delay()) || 0;
            element.style.animationDelay = `${delayMs}ms`;
            element.classList.add('fade-up-in');
            this.observer?.unobserve(element);
          }
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
