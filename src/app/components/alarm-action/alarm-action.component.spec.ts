import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmActionComponent } from './alarm-action.component';

describe('AlarmActionComponent', () => {
  let component: AlarmActionComponent;
  let fixture: ComponentFixture<AlarmActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
