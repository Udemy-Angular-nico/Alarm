import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlerAlarmComponent } from './controler-alarm.component';

describe('ControlerAlarmComponent', () => {
  let component: ControlerAlarmComponent;
  let fixture: ComponentFixture<ControlerAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlerAlarmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlerAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
