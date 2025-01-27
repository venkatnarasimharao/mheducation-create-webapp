import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hec-favourites',
  standalone: true,
  imports: [],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {
  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.fetchFavouritesList();
  }
  fetchFavouritesList(): void {
    this.apiService.getFavouritesList().subscribe((Response) => {
      console.log('Favourites List:', Response);
    })
  }
}
