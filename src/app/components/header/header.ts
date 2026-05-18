import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Theme } from '../../services/theme';
import { PORTFOLIO } from '../../config/portfolio.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly theme = inject(Theme);
  protected readonly mobileOpen = signal(false);
  protected readonly nav = PORTFOLIO.nav;
  protected readonly initials = this.computeInitials(PORTFOLIO.profile.name);

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }

  private computeInitials(name: string): string {
    return name
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
