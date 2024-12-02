import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-accordion',
  standalone: true,
  imports: [
    NgbAccordionModule,
  ],
  templateUrl: './ngb-accordion.component.html',
  styleUrl: './ngb-accordion.component.scss'
})
export class NgbAccordionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
