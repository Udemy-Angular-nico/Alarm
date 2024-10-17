import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Action, ActionService} from "../../services/storage.service";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {ControlerAlarmComponent} from "../controler-alarm/controler-alarm.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alarm-action',
  standalone: true,
  imports: [
    MatIcon,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    ControlerAlarmComponent
  ],
  templateUrl: './alarm-action.component.html',
  styleUrl: './alarm-action.component.css',
  providers: [ActionService]
})
export class AlarmActionComponent implements OnInit {
  today: string = 'Today';
  date: string = 'DD/MM';
  select1: string = '';

  columnas: string[] = ['Today','Date','select']

  dataAction: Action[] = [];

  constructor(
    private router: Router,
    private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.actionService.data$.subscribe(data => {
      this.dataAction = data;
    })
  }

  returnLeft() {
    this.router.navigate(['/devp/alarm']);
  }

  toggleSelection(action: Action) {
    action.selected = !action.selected;
  }
}
