import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAlertComponent } from './ng-alert.component';

describe('NgAlertComponent', () => {
  let component: NgAlertComponent;
  let fixture: ComponentFixture<NgAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
