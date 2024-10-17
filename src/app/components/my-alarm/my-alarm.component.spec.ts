import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAlarmComponent } from './my-alarm.component';

describe('MyAlarmComponent', () => {
  let component: MyAlarmComponent;
  let fixture: ComponentFixture<MyAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAlarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
