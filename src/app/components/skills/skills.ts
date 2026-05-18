import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = PORTFOLIO.skills;
  protected readonly specializations = PORTFOLIO.specializations;
}
