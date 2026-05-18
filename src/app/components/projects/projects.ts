import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';
import { PipelineCard } from '../pipeline-card/pipeline-card';

@Component({
  selector: 'app-projects',
  imports: [PipelineCard, NgTemplateOutlet],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly featured = PORTFOLIO.projects.filter((p) => p.featured);
  protected readonly more = PORTFOLIO.projects.filter((p) => !p.featured);
  protected readonly showMore = signal(false);
  protected readonly hasMore = computed(() => this.more.length > 0);

  toggleMore() {
    this.showMore.update((v) => !v);
  }
}
