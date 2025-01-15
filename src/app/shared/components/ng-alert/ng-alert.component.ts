import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hec-ng-alert',
  standalone: true,
  imports: [NgbAlertModule, CommonModule],
  templateUrl: './ng-alert.component.html',
  styleUrl: './ng-alert.component.scss'
})
export class NgAlertComponent {
  @Input() alert: any | undefined;
}
