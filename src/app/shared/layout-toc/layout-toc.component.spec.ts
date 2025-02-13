import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTocComponent } from './layout-toc.component';

describe('LayoutTocComponent', () => {
  let component: LayoutTocComponent;
  let fixture: ComponentFixture<LayoutTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutTocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
