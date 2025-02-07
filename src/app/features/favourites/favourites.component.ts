import { CommonModule } from '@angular/common';
import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { CommonStateService } from '../../core/services/common-state/common-state.service';

@Component({
  selector: 'hec-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {
  constructor(private apiService: ApiService,
    private commonstateService: CommonStateService
  ) { }
  favouriteList: { type: any; title: any; guid: any; ingested: any, imageUrl: any, isFav: boolean, year: any, authors: any, description: any, isMoreButton: boolean, isFavLoader: boolean }[] = [];
  isFavLoading: boolean = false;

  ngOnInit(): void {
    this.isFavLoading = true;
    this.apiService.getFavouriteList().subscribe((res) => {
      this.isFavLoading = false;
      const response = JSON.parse(res.body).result; // Parse response data
      console.log(response);
      this.favouriteList = response.map((item: any) => ({
        type: item.type,
        title: item.title,
        guid: item.guid,
        ingested: item.ingested,
        imageUrl: this.commonstateService.getImageUrl(`/covers/${item.isbn}.jpeg`,false),
        isFav: true,
        year: item.year,
        authors: typeof (item.authors) == 'string' ? item.authors : "",
        description: item.description,
        isMoreButton: item.description ? true : false,
        isFavLoader: false,
      })).reverse();;
      console.log(this.favouriteList);
    },
      (err) => {
        this.isFavLoading = false;
        console.error('Error fetching favourites', err);
        this.favouriteList = []; // Reset favourite list in case of error
      });
  }
  toggleFavChange(item: any) {
    item.isFavLoader = true;
    if (!item.isFav) {
      this.apiService.addFavourite(item.guid).subscribe(() => {
        item.isFavLoader = false;
        item.isFav = true;
      });
    }
    else {
      this.apiService.deleteFavorite(item.guid).subscribe(() => {
        item.isFavLoader = false;
        item.isFav = false;
      });
    }
  }
  toggleShowDescription(item: any) {
    item.isMoreButton = !item.isMoreButton
  }
}
