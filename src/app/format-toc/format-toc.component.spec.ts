import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatTocComponent } from './format-toc.component';

describe('FormatTocComponent', () => {
  let component: FormatTocComponent;
  let fixture: ComponentFixture<FormatTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatTocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
