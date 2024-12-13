import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHeadingComponent } from './projects-heading.component';

describe('ProjectsHeadingComponent', () => {
  let component: ProjectsHeadingComponent;
  let fixture: ComponentFixture<ProjectsHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
