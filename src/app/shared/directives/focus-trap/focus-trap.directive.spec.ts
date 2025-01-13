import { FocusTrapDirective } from './focus-trap.directive';
import { ElementRef } from '@angular/core';

describe('FocusTrapDirective', () => {

  let directive: FocusTrapDirective;
  let elementRef: ElementRef;
  let dropdownMenu: HTMLElement;

  beforeEach(() => {
    dropdownMenu = document.createElement('button');
    elementRef = new ElementRef(dropdownMenu);

    directive = new FocusTrapDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
