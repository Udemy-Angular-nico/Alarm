import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-controler-alarm',
  standalone: true,
  imports: [
    MatIconModule,
    MatFabButton
  ],
  templateUrl: './controler-alarm.component.html',
  styleUrl: './controler-alarm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlerAlarmComponent implements OnInit {
  iconAdd = true;
  add_c = 'add_circle';

  constructor(
    private router: Router
  ) {}

  @Input() ButtonController!: { Option: boolean };

  ngOnInit(): void {
    this.add_c = this.ButtonController.Option ? 'add_circle' : 'list';
  }

  schedule(): void {
    this.router.navigate(['/devp/clock']);
  }
  today(): void {
    this.router.navigate(['/devp/action']);
  }
  add_circle(): void {
    if (this.ButtonController.Option)  this.router.navigate(['/devp/data']);
    else this.router.navigate(['/devp/alarm']);
  }
}
