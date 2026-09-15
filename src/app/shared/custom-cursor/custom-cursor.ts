import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="gesture-ring" #ring></div>`,
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  private ring?: HTMLElement;
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private rafId?: number;
  private mediaQuery?: MediaQueryList;
  private isActive = false;

  private readonly onMouseMove = (event: MouseEvent) => {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
    if (this.ring && this.ring.style.opacity !== '1') {
      this.ring.style.opacity = '1';
    }
    const target = event.target as HTMLElement;
    const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"]');
    this.ring?.classList.toggle('gesture-ring--active', isInteractive);
  };

  private readonly onMouseLeave = () => {
    if (this.ring) this.ring.style.opacity = '0';
  };

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    this.mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    this.applyMode();
    this.mediaQuery.addEventListener('change', this.applyMode);
  }

  private readonly applyMode = () => {
    const shouldActivate = !!this.mediaQuery?.matches;
    if (shouldActivate === this.isActive) return;
    this.isActive = shouldActivate;

    if (shouldActivate) {
      document.documentElement.classList.add('has-custom-cursor');
      this.ring = this.host.nativeElement.querySelector('.gesture-ring') ?? undefined;
      if (this.ring) this.ring.style.opacity = '0';
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', this.onMouseLeave);
      this.tick();
    } else {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', this.onMouseMove);
      document.documentElement.removeEventListener('mouseleave', this.onMouseLeave);
      if (this.rafId) cancelAnimationFrame(this.rafId);
    }
  };

  private tick = (): void => {
    this.currentX += (this.targetX - this.currentX) * 0.18;
    this.currentY += (this.targetY - this.currentY) * 0.18;
    if (this.ring) {
      this.ring.style.transform = `translate(${this.currentX}px, ${this.currentY}px) translate(-50%, -50%)`;
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('mousemove', this.onMouseMove);
    document.documentElement.removeEventListener('mouseleave', this.onMouseLeave);
    this.mediaQuery?.removeEventListener('change', this.applyMode);
    document.documentElement.classList.remove('has-custom-cursor');
  }
}
