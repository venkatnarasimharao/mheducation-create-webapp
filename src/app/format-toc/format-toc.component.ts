import { Component } from '@angular/core';
import { PriceSummaryCardComponent } from '../price-summary-card/price-summary-card.component';

@Component({
  selector: 'app-format-toc',
  standalone: true,
  imports: [PriceSummaryCardComponent],
  templateUrl: './format-toc.component.html',
  styleUrl: './format-toc.component.scss'
})
export class FormatTocComponent {

}
