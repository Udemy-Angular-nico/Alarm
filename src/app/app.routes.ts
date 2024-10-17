import {RouterModule, Routes} from '@angular/router';
import {AlarmComponent} from "./components/alarm/alarm.component";
import {StartComponent} from "./components/start/start.component";
import {DevplannerComponent} from "./components/devplanner/devplanner.component";
import {MyAlarmComponent} from "./components/my-alarm/my-alarm.component";
import {TimeClockComponent} from "./components/time-clock/time-clock.component";
import {DataAlarmComponent} from "./components/data-alarm/data-alarm.component";
import {AlarmActionComponent} from "./components/alarm-action/alarm-action.component";

export const routes: Routes = [
  { path: '', component: AlarmComponent },
  { path: 'home', component: StartComponent },
  {
    path: 'devp', component: DevplannerComponent,
    children: [
      { path: 'alarm', component: MyAlarmComponent },
      { path: 'clock', component: TimeClockComponent },
      { path: 'data', component: DataAlarmComponent },
      { path: 'data/:id', component: DataAlarmComponent },
      { path: 'action', component: AlarmActionComponent }
    ]
  }
];
