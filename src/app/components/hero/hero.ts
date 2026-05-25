import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { animate, inView } from 'motion';
import type { AnimationPlaybackControls } from 'motion';
import { PORTFOLIO } from '../../config/portfolio.config';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements AfterViewInit, OnDestroy {
  protected readonly profile = PORTFOLIO.profile;
  protected readonly heroSkills = PORTFOLIO.heroSkills;
  protected readonly socials = PORTFOLIO.socials;
  protected readonly orbitBadges = PORTFOLIO.orbitBadges;
  protected readonly avatarFailed = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private swayControls: AnimationPlaybackControls[] = [];
  private stopSwayObserver?: () => void;

  @ViewChild('cardA') private cardA?: ElementRef<HTMLDivElement>;
  @ViewChild('cardB') private cardB?: ElementRef<HTMLDivElement>;

  iconUrl(devicon: string): string {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}.svg`;
  }

  onAvatarError() {
    this.avatarFailed.set(true);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const a = this.cardA?.nativeElement;
    const b = this.cardB?.nativeElement;
    if (!a || !b) return;

    this.swayControls.push(
      animate(
        a as Element,
        { rotate: [3, 6, 3], y: [0, -4, 0] },
        { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      ),
      animate(
        b as Element,
        { rotate: [-2, -5, -2], y: [0, 3, 0] },
        { duration: 9, repeat: Infinity, ease: 'easeInOut' },
      ),
    );

    // Pause the infinite sway when the avatar is off-screen so we're not
    // burning rAF cycles for an animation no-one can see.
    this.stopSwayObserver = inView(
      a as Element,
      () => {
        for (const c of this.swayControls) c.play();
        return () => {
          for (const c of this.swayControls) c.pause();
        };
      },
      { margin: '20% 0px 20% 0px' as any },
    );
  }

  ngOnDestroy() {
    this.stopSwayObserver?.();
    for (const c of this.swayControls) c.stop();
    this.swayControls = [];
  }
}
