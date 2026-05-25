import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = PORTFOLIO.skills;
  protected readonly specializations = PORTFOLIO.specializations;
}
