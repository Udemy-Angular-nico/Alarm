import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAppsComponent } from './form-apps.component';

describe('FormAppsComponent', () => {
  let component: FormAppsComponent;
  let fixture: ComponentFixture<FormAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
