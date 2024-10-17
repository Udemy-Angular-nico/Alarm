import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlerAlarmComponent} from "../controler-alarm/controler-alarm.component";
import {MatIcon} from "@angular/material/icon";
import {Location, NgClass, NgIf} from '@angular/common';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Time} from "../../services/storage.service";

@Component({
  selector: 'app-time-clock',
  standalone: true,
  imports: [
    ControlerAlarmComponent,
    MatIcon,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './time-clock.component.html',
  styleUrl: './time-clock.component.css'
})
export class TimeClockComponent implements OnInit {
  name = 'Clock Time';
  Hour = 'Hour';
  Minute = 'Minute';
  cancel = 'Cancel';
  ok = 'Save'
  hours: string = '00';  // Variable para las horas
  minutes: string = '00';  // Variable para los minutos
  times: string = '';  // Variable para mostrar el resultado combinado

  editUser: boolean = true;

  constructor(
    private location: Location,
    private router: Router
  ) {}

  // Output event to emit the selected time
  @Output() timeSelected = new EventEmitter<{ hour: number; minute: number }>();
  @Output() returnSelected = new EventEmitter<void>();
  @Input() timeData!: { time: Time, edit: boolean };

  ngOnInit(): void {
    if (this.timeData){
      this.hours = String(this.timeData.time.Hour);
      this.minutes = String(this.timeData.time.Minute);
      this.editUser = !this.timeData.edit;
    }
  }

  returnLeft(): void {
    if (this.editUser) this.router.navigate(['/devp/alarm']);
    else this.returnSelected.emit();
  }

  returnRight(): void {
    if (this.editUser) this.router.navigate(['/devp/alarm']);
    else this.timeSelected.emit({ hour: parseInt(this.hours), minute: parseInt(this.minutes) });
  }

  // Función para actualizar las horas
  updateHours() {
    let h = parseInt(this.hours, 10);
    if (isNaN(h) || h < 0 || h >= 24) {
      this.hours = '00';  // Si las horas no son válidas, las reiniciamos a 00
    } else {
      this.hours = this.padTime(h.toString());
    }
    this.updateTime();  // Llama a la función que muestra el tiempo
  }

  // Función para actualizar los minutos
  updateMinutes() {
    let m = parseInt(this.minutes, 10);
    if (isNaN(m) || m < 0 || m >= 60) {
      this.minutes = '00';  // Si los minutos no son válidos, los reiniciamos a 00
    } else {
      this.minutes = this.padTime(m.toString());
    }
    this.updateTime();  // Llama a la función que muestra el tiempo
  }

  // Función para asegurar que el valor tenga dos dígitos
  padTime(value: string): string {
    return value.padStart(2, '0');
  }

  // Actualiza el tiempo mostrado combinando horas y minutos
  updateTime() {
    this.times = `${this.hours}:${this.minutes}`;
  }
}
