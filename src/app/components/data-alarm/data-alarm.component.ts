import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  DataAlarm,
  User,
  Priority,
  Voice,
  Tone,
  DataAlarmService
} from "../../services/storage.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {
  MatDatepickerModule
} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOption, MatOptionModule} from "@angular/material/core";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {TimeClockComponent} from "../time-clock/time-clock.component";
import {InformationComponent} from "../information/information.component";

@Component({
  selector: 'app-data-alarm',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    NgOptimizedImage,
    MatSelectModule,
    MatOptionModule,
    NgForOf,
    NgClass,
    NgIf,
    TimeClockComponent,
    InformationComponent
  ],
  templateUrl: './data-alarm.component.html',
  styleUrl: './data-alarm.component.css',
  providers: [DataAlarmService]
})
export class DataAlarmComponent implements OnInit {
  idParam: string | null = '';
  nameUser = 'Name';
  descriptionUser = 'Description';
  DateUser = 'Date';
  hourUser = 'Time';
  addTo = 'Add to';
  priorityUser = 'Priority';
  voiceUser = 'Voice'
  toneUser = 'Tone'

  cancel = 'Cancel';
  delete = 'Delete';
  save = 'Save';

  timeUser: number = 0;
  editUser: boolean = true;
  infoUser: number = 0;

  user: User;
  priority = Priority;
  voice = Voice;
  tone = Tone;

  @ViewChild(InformationComponent) infoComponent!: InformationComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataAlarmService: DataAlarmService
  ) {
    this.user = {
      alarm: '',
      Description: '',
      Date: new Date(),
      Time: {
        Hour: 0,
        Minute: 0
      },
      Priority: 0,
      Voice: 0,
      Tone: 0,
      selected: false
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      this.editUser = !!this.idParam;
    })
    this.dataAlarmService.data$.subscribe(data => {
      this.user = this.idParam ? data[parseInt(this.idParam)] : {
        alarm: '',
        Description: '',
        Date: new Date(),
        Time: {
          Hour: 0,
          Minute: 0
        },
        Priority: 0,
        Voice: 0,
        Tone: 0,
        selected: false
      }
    })
    if (!this.editUser) {
      this.infoUser = 2;
      this.TimeClock(2);
    }
  }

  TimeClock(i: number): void {
    this.timeUser = i;
  }

  // Function to handle time selection
  onTimeSelected(event: { hour: number; minute: number }) {
    this.user.Time.Hour = event.hour;
    this.user.Time.Minute = event.minute;
    this.TimeClock(0);
  }

  returnCancel(): void {
    this.router.navigate(['/devp/alarm']);
  }

  returnDelete(): void {
    if (typeof this.idParam === "string") {
      this.dataAlarmService.removeAlarm(parseInt(this.idParam));
    }
    this.infoUser = 1;
    this.infoComponent.onInit(1);
    setTimeout(() => {
      this.returnCancel();
    }, 3000); // 3000 ms = 3 segundo
  }

  returnSave(): void {
    //Funcion que guarde los cambios realizados
    if (this.editUser) {
      if (typeof this.idParam === "string") {
        this.dataAlarmService.updateAlarm(this.user, parseInt(this.idParam));
      }
      this.infoUser = 5;
      this.TimeClock(2)
    }
    else {
      this.dataAlarmService.addAlarm(this.user);
      this.infoUser = 3;
      this.TimeClock(2)
    }
  }
}
