import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  @Input() result: any;

  isFavorite: boolean = false;

  isClicked: boolean = false;

  toggleFavorite(){
    this.isFavorite = !this.isFavorite;
  }

  toggleClicked(){
    this.isClicked = !this.isClicked;
  }


}
