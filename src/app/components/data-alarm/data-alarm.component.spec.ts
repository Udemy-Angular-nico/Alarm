import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAlarmComponent } from './data-alarm.component';

describe('DataAlarmComponent', () => {
  let component: DataAlarmComponent;
  let fixture: ComponentFixture<DataAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAlarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
