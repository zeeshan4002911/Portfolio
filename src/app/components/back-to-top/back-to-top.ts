import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { animate } from 'motion';
import type { AnimationPlaybackControls } from 'motion';

/**
 * Floating "back to top" button.
 * Shows once the user has scrolled past `threshold` pixels - i.e. when the
 * sticky header is well behind them and the page no longer fits in the
 * initial viewport.
 */
@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTop implements AfterViewInit {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly threshold = 600;
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private reduceMotion = false;
  private lastShown = false;
  private currentAnim?: AnimationPlaybackControls;

  protected readonly visible = signal(false);

  @ViewChild('btn') private btn?: ElementRef<HTMLButtonElement>;

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.reduceMotion = !!this.doc.defaultView?.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    // Sync state on load (covers a refresh deep in the page).
    const y = this.doc.defaultView?.scrollY ?? 0;
    const show = y > this.threshold;
    this.visible.set(show);
    this.lastShown = show;
    const el = this.btn?.nativeElement;
    if (el && !show) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px) scale(0.6)';
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const y = this.doc.defaultView?.scrollY ?? 0;
    const next = y > this.threshold;
    if (next === this.lastShown) return;
    this.lastShown = next;
    this.visible.set(next);
    this.animatePresence(next);
  }

  private animatePresence(show: boolean) {
    const el = this.btn?.nativeElement;
    if (!el) return;
    if (this.reduceMotion) {
      el.style.opacity = show ? '1' : '0';
      el.style.transform = show ? 'none' : 'translateY(16px) scale(0.6)';
      return;
    }
    this.currentAnim?.stop();
    this.currentAnim = animate(
      el as Element,
      show
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.6, y: 16 },
      { duration: 0.28, ease: [0.2, 0.9, 0.3, 1.2] },
    );
  }

  scrollToTop() {
    const win = this.doc.defaultView;
    if (!win) return;
    win.scrollTo({ top: 0, behavior: this.reduceMotion ? 'auto' : 'smooth' });
  }
}
