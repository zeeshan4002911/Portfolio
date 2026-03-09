import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  localStorageKey = "theme_portfolio"

  toggleTheme() {
    const root = document.documentElement;

    root.classList.toggle("dark");

    if (root.classList.contains("dark")) {
      localStorage.setItem(this.localStorageKey, "dark");
    } else {
      localStorage.setItem(this.localStorageKey, "light");
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.localStorageKey);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }
}