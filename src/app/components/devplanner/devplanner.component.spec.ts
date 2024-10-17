import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevplannerComponent } from './devplanner.component';

describe('DevplannerComponent', () => {
  let component: DevplannerComponent;
  let fixture: ComponentFixture<DevplannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevplannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
