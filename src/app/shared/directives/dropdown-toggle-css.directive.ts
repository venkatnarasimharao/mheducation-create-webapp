import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngbDropdownToggle][noCaret]',
  standalone: true
})
export class NgbDropdownToggleNoCaretDirective implements OnInit {
  constructor(private readonly el: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.removeClass(this.el.nativeElement, 'dropdown-toggle');
  }
}
