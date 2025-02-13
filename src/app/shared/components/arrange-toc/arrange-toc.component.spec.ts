import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeTocComponent } from './arrange-toc.component';

describe('ArrangeTocComponent', () => {
  let component: ArrangeTocComponent;
  let fixture: ComponentFixture<ArrangeTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrangeTocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrangeTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
