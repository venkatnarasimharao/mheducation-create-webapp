import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from '../interface/alert';

@Component({
  selector: 'app-alert-component',
  standalone: true,
  imports: [NgbAlertModule,CommonModule],
  templateUrl: './alert-component.component.html',
  styleUrl: './alert-component.component.scss'
})
export class AlertComponentComponent {
  @Input() alert:IAlert | undefined;
  
}
