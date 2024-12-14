import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCdkComponent } from './menu-cdk.component';

describe('MenuCdkComponent', () => {
  let component: MenuCdkComponent;
  let fixture: ComponentFixture<MenuCdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCdkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
