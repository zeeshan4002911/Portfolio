import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { animate } from 'motion';
import type { AnimationPlaybackControls } from 'motion';
import { PORTFOLIO } from '../../config/portfolio.config';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements AfterViewInit {
  protected readonly theme = inject(Theme);
  protected readonly mobileOpen = signal(false);
  protected readonly nav = PORTFOLIO.nav;
  protected readonly initials = this.computeInitials(PORTFOLIO.profile.name);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private reduceMotion = false;
  private themeAnim?: AnimationPlaybackControls;
  private panelAnim?: AnimationPlaybackControls;

  @ViewChild('hostEl') private hostEl?: ElementRef<HTMLElement>;
  @ViewChild('themeIcon') private themeIcon?: ElementRef<HTMLSpanElement>;
  @ViewChild('mobilePanel') private mobilePanel?: ElementRef<HTMLDivElement>;

  constructor() {
    let firstThemeRun = true;
    effect(() => {
      this.theme.isDark();
      if (firstThemeRun) {
        firstThemeRun = false;
        return;
      }
      this.animateThemeIcon();
    });

    let firstMenuRun = true;
    effect(() => {
      const open = this.mobileOpen();
      if (firstMenuRun) {
        firstMenuRun = false;
        return;
      }
      if (open) queueMicrotask(() => this.animateMobilePanel());
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (this.reduceMotion) return;
    const el = this.hostEl?.nativeElement;
    if (!el) return;
    animate(
      el as Element,
      { opacity: [0, 1], y: [-12, 0] },
      { duration: 0.5, ease: [0.22, 0.9, 0.3, 1] },
    );
  }

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }

  private animateThemeIcon() {
    if (!this.isBrowser || this.reduceMotion) return;
    const el = this.themeIcon?.nativeElement;
    if (!el) return;
    this.themeAnim?.stop();
    this.themeAnim = animate(
      el as Element,
      { rotate: [-90, 0], scale: [0.6, 1], opacity: [0, 1] },
      { duration: 0.32, ease: [0.2, 0.9, 0.3, 1.2] },
    );
  }

  private animateMobilePanel() {
    if (!this.isBrowser || this.reduceMotion) return;
    const el = this.mobilePanel?.nativeElement;
    if (!el) return;
    this.panelAnim?.stop();
    this.panelAnim = animate(
      el as Element,
      { opacity: [0, 1], y: [-8, 0] },
      { duration: 0.22, ease: [0.22, 0.9, 0.3, 1] },
    );
  }

  private computeInitials(name: string): string {
    return name
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
