import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  screenHeigth: any;
  screenWidth: any;
  footerMaxHeigth!: Number;
  title = 'angularecommerce';

  constructor() {
    this.getScreenSize(event);
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenHeigth = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // console.log(this.screenHeigth, this.screenWidth);
    this.footerMaxHeigth = this.screenHeigth - 160;
  }
}
