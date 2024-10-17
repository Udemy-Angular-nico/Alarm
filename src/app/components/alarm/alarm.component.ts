import {Component, OnInit} from '@angular/core';
import {StartLoginComponent} from "../start-login/start-login.component";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alarm',
  standalone: true,
  imports: [
    StartLoginComponent
  ],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.css'
})
export class AlarmComponent {}
