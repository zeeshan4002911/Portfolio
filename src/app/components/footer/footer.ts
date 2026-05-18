import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly profile = PORTFOLIO.profile;
  protected readonly socials = PORTFOLIO.socials;
  protected readonly interests = PORTFOLIO.interests;
  protected readonly year = new Date().getFullYear();
}
