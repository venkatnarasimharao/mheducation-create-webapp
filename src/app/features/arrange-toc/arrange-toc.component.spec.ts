import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeTOCComponent } from './arrange-toc.component';

describe('ArrangeTOCComponent', () => {
  let component: ArrangeTOCComponent;
  let fixture: ComponentFixture<ArrangeTOCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrangeTOCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrangeTOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
