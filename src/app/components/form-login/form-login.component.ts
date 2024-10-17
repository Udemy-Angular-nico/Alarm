import {Component, EventEmitter, Output} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { StorageService } from "../../services/storage.service";
import {Router} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  login = 'Iniciar Sesión';
  Pass = 'Contraseña';
  register = 'Ingresar';
  cancel = 'Cancelar';
  name = 'Email';

  user = new User()
  @Output() cambiarVista = new EventEmitter<void>(); // Emisor de eventos

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  alternate() {
    this.cambiarVista.emit();
  }

  select(): void {
    if (this.user.email && this.user.password) {  // Verificar que user y sus propiedades existan
      this.storageService.setEncryptedItem('User', { 'email': this.user.email, 'password': this.user.password });
      this.router.navigate(['/devp/alarm']);
    } else {
      console.error('El objeto user o alguna de sus propiedades no está definido');
    }
  }
}

export class User {
  email?: string = '';
  password?: string = '';
}
