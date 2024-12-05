import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcontentComponent } from './fcontent.component';

describe('FcontentComponent', () => {
  let component: FcontentComponent;
  let fixture: ComponentFixture<FcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
