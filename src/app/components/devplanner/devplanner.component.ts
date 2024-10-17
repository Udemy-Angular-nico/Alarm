import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {DataAlarmService, StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-devplanner',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './devplanner.component.html',
  styleUrl: './devplanner.component.css',
  providers: [DataAlarmService]
})
export class DevplannerComponent implements OnInit {
  name = 'DEVPLANNER';

  constructor(
    private dataAlarmService: DataAlarmService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (!this.storageService.hasLocalStorageItem('User')) {
    //   this.router.navigate(['/'])
    // }
    // else {
    this.dataAlarmService.saveDataToSession();
    // }
    // console.log(this.storageService.hasLocalStorageItem('User'))
  }
}
