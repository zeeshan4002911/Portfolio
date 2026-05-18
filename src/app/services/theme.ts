import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

type Mode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly doc = inject(DOCUMENT);
  private readonly storageKey = 'portfolio-theme';

  readonly mode = signal<Mode>(this.readInitial());
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this.mode();
      const root = this.doc.documentElement;
      root.classList.toggle('dark', mode === 'dark');
      try {
        localStorage.setItem(this.storageKey, mode);
      } catch {
        // ignore storage failures (private mode, etc.)
      }
    });
  }

  toggle(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private readInitial(): Mode {
    try {
      const stored = localStorage.getItem(this.storageKey) as Mode | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // ignore
    }
    const prefersDark = this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
