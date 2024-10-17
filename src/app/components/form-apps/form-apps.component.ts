import {Component, EventEmitter, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-form-apps',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './form-apps.component.html',
  styleUrl: './form-apps.component.css'
})
export class FormAppsComponent {
  session = 'Inicio de sección';
  google = 'Google';
  face = 'Facebook';
  apple = 'Apple';
  email = 'Correo';

  // alternateComponent

  @Output() cambiarVista = new EventEmitter<void>(); // Emisor de eventos

  alternate() {
    this.cambiarVista.emit();
  }
}
