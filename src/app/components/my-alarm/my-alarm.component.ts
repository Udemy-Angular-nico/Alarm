import {Component, NgModule, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {ControlerAlarmComponent} from "../controler-alarm/controler-alarm.component";
import {DataAlarm, DataAlarmService, User} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-alarm',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    ControlerAlarmComponent
  ],
  templateUrl: './my-alarm.component.html',
  styleUrl: './my-alarm.component.css',
  providers: [DataAlarmService]
})
export class MyAlarmComponent implements OnInit{
  alarm = 'My Alarms'

  columnas: string[] = ['alarm', 'select'];

  dataSource: User[] = []

  constructor(
    private router: Router,
    private dataAlarmService: DataAlarmService
  ) {}

  ngOnInit(): void {
    this.dataAlarmService.data$.subscribe(data => {
      this.dataSource = data;
    });
  }

  // Metodo para visualizar los datos de las alarmas
  DataAlarm(index: number) {
    this.router.navigate(['/devp/data', index]);
  }

  // Metodo para manejar la selección del checkbox
  toggleSelection(alarm: User) {
    alarm.selected = !alarm.selected;
  }
}
