import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('despachos-app');
 
  toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav?.classList.toggle('show');
  }
  
}
