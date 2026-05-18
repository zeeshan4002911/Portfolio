import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly profile = PORTFOLIO.profile;
  protected readonly heroSkills = PORTFOLIO.heroSkills;
  protected readonly socials = PORTFOLIO.socials;
  protected readonly orbitBadges = PORTFOLIO.orbitBadges;
  protected readonly avatarFailed = signal(false);

  iconUrl(slug: string): string {
    return `https://cdn.simpleicons.org/${slug}/ffffff`;
  }

  onAvatarError() {
    this.avatarFailed.set(true);
  }
}
