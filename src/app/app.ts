import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { BackToTop } from './components/back-to-top/back-to-top';
import { Theme } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Experience, Projects, Skills, Contact, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Eagerly instantiate the theme service so it applies the saved mode on first render.
  private readonly theme = inject(Theme);
}
