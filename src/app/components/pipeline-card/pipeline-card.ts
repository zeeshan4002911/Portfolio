import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { StackLayer } from '../../config/portfolio.config';

@Component({
  selector: 'app-pipeline-card',
  templateUrl: './pipeline-card.html',
  styleUrl: './pipeline-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineCard {
  readonly layers = input.required<StackLayer[]>();

  private readonly hovered = signal<number | null>(null);
  readonly activeIndex = computed(() => this.hovered() ?? -1);

  onEnter(index: number) {
    this.hovered.set(index);
  }
  onLeave() {
    this.hovered.set(null);
  }
}
