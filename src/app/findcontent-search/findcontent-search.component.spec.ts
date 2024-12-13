import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindcontentSearchComponent } from './findcontent-search.component';

describe('FindcontentSearchComponent', () => {
  let component: FindcontentSearchComponent;
  let fixture: ComponentFixture<FindcontentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindcontentSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindcontentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
