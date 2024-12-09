import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindcontentComponent } from './findcontent.component';

describe('FindcontentComponent', () => {
  let component: FindcontentComponent;
  let fixture: ComponentFixture<FindcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
