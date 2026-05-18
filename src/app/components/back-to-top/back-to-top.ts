import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';

/**
 * Floating "back to top" button.
 * Shows once the user has scrolled past `threshold` pixels — i.e. when the
 * sticky header is well behind them and the page no longer fits in the
 * initial viewport.
 */
@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTop {
  private readonly doc = inject(DOCUMENT);
  private readonly threshold = 600;

  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    const y = this.doc.defaultView?.scrollY ?? 0;
    this.visible.set(y > this.threshold);
  }

  scrollToTop() {
    const win = this.doc.defaultView;
    if (!win) return;
    const reduce = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    win.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
