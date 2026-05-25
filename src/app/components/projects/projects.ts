import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PORTFOLIO } from '../../config/portfolio.config';
import { RevealDirective } from '../../directives/reveal.directive';
import { ArchitectureCard } from '../architecture-card/architecture-card';

@Component({
  selector: 'app-projects',
  imports: [ArchitectureCard, NgTemplateOutlet, RevealDirective],
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
