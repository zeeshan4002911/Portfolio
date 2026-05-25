import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  booleanAttribute,
  inject,
  numberAttribute,
} from '@angular/core';
import { animate, inView, stagger } from 'motion';
import type { AnimationPlaybackControls, DOMKeyframesDefinition } from 'motion';

/**
 * Fade + slide-up entrance, triggered when the host enters the viewport.
 * Falls back to instant visibility when the user prefers reduced motion.
 *
 * Usage:
 *   <section appReveal>…</section>                            // animate the host
 *   <div appReveal revealStagger=".reveal-child">…</div>      // stagger matching children
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  @Input({ transform: numberAttribute }) revealOffset = 24;
  @Input({ transform: numberAttribute }) revealDelay = 0;
  @Input({ transform: numberAttribute }) revealDuration = 0.6;
  @Input() revealStagger?: string;
  @Input({ transform: numberAttribute }) revealStaggerDelay = 0.08;
  @Input() revealMargin = '0px 0px -10% 0px';
  @Input({ transform: booleanAttribute }) revealOnce = false;
  /** Skip the translateY part — use when the target already owns a transform (e.g. float keyframes). */
  @Input({ transform: booleanAttribute }) revealOpacityOnly = false;

  private targets: HTMLElement[] = [];
  private keyframes!: DOMKeyframesDefinition;
  private willChangeValue = '';
  private currentAnim?: AnimationPlaybackControls;
  private stopObserver?: () => void;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const el = this.host.nativeElement;
    this.targets = this.revealStagger
      ? (Array.from(el.querySelectorAll(this.revealStagger)) as HTMLElement[])
      : [el];

    if (this.targets.length === 0) return;

    this.keyframes = this.revealOpacityOnly
      ? { opacity: [0, 1] }
      : { opacity: [0, 1], y: [this.revealOffset, 0] };
    this.willChangeValue = this.revealOpacityOnly ? 'opacity' : 'opacity, transform';

    this.hide();

    this.stopObserver = inView(
      el,
      () => {
        this.currentAnim?.stop();
        this.currentAnim = animate(this.targets as Element[], this.keyframes, {
          duration: this.revealDuration,
          delay: this.revealStagger
            ? stagger(this.revealStaggerDelay, { startDelay: this.revealDelay / 1000 })
            : this.revealDelay / 1000,
          ease: [0.22, 0.9, 0.3, 1],
          onComplete: () => this.clearWillChange(),
        });
        return this.revealOnce ? undefined : () => this.hide();
      },
      { margin: this.revealMargin as any },
    );
  }

  ngOnDestroy(): void {
    this.stopObserver?.();
    this.currentAnim?.stop();
  }

  private hide(): void {
    for (const t of this.targets) {
      const s = t.style;
      s.opacity = '0';
      if (!this.revealOpacityOnly) s.transform = `translateY(${this.revealOffset}px)`;
      s.willChange = this.willChangeValue;
    }
  }

  private clearWillChange(): void {
    for (const t of this.targets) t.style.willChange = '';
  }
}
