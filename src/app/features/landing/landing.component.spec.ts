import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let consoleLogSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LandingComponent,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    consoleLogSpy = spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleSearch and log the event', () => {
    const mockEvent = {
      categories: ['category1', 'category2'],
      term: 'search term'
    };
    component.handleSearch(mockEvent);
    expect(consoleLogSpy).toHaveBeenCalledWith('Search Data:', mockEvent);
  });
});
