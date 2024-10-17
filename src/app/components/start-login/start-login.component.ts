import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common'
import {FormLoginComponent} from "../form-login/form-login.component";
import {FormAppsComponent} from "../form-apps/form-apps.component";

@Component({
  selector: 'app-start-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormLoginComponent,
    FormAppsComponent,
    NgIf
  ],
  templateUrl: './start-login.component.html',
  styleUrl: './start-login.component.css'
})
export class StartLoginComponent {
  loginComponent: boolean = false;

  // Función que alterna los componentes
  alternateComponent() {
    this.loginComponent = !this.loginComponent;
  }
}
