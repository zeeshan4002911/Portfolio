import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly experiences = PORTFOLIO.experiences;
  protected readonly certifications = PORTFOLIO.certifications;
}
