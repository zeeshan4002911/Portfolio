import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: 'app.html',
})
export class App {

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
    this._themeService.loadTheme();
  }

  toggleTheme() {
    this._themeService.toggleTheme();
  }
}
