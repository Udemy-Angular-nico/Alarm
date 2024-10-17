import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    NgClass
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent implements OnInit {
  text: string = '';
  Cancel = 'Cancel';
  Accept = 'Accept';

  icon: string = '';

  @Output() returnCancel = new EventEmitter<void>();
  @Output() returnAccept = new EventEmitter<void>();
  @Output() saveSelected = new EventEmitter<void>();
  @Input() typeUser!: { use: number };

  ngOnInit(): void {
    this.onInit(this.typeUser.use);
    if ([1,3,5].includes(this.typeUser.use)) {
      setTimeout(() => {
        this.saveSelected.emit();
      }, 3000); // 3000 ms = 3 segundo
    }
  }

  onInit(aux: number): void {
    //Se borro el dato
    if (aux === 0) {
      this.text = 'Delete alarm?';
      this.icon = 'error';
    }
    // Confirmar eliminacion
    else if (aux === 1) {
      this.text = 'Alarm successfully removed';
      this.icon = 'check_circle'
    }
    // Grabacion
    else if (aux === 2) {
      this.text = 'Press to record';
      this.icon = 'settings_voice'
    }
    //Crear alarma
    else if (aux === 3) {
      this.text = 'Alarm created successfully';
      this.icon = 'check_circle'
    }
    //default
    else if (aux === 4) {
      this.text = '.........';
      this.icon = 'radio_button_checked'
    }
    else if (aux === 5) {
      this.text = 'Alarm updated successfully';
      this.icon = 'update';
    }
  }

  ButtonCancel(): void {
    this.returnCancel.emit();
  }

  ButtonAccept(): void {
    this.returnAccept.emit();
  }

  NextVoice(): void {
    if (this.typeUser.use === 2) {
      this.onInit(4);
      this.typeUser.use = 4;
      setTimeout(() => {
        this.returnCancel.emit();
      }, 4000);
    }
  }
}
