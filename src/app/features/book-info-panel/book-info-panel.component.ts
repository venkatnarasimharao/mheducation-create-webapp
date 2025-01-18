import { AuthService } from './../../core/services/auth/auth.service';
import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { search_inside_config } from '../../shared/constants/search-payload.config';
import { LoginComponent } from '../../shared/components/login/login.component';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BookPageViewerComponent } from '../book-page-viewer/book-page-viewer.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hec-book-info-panel',
  standalone: true,
  imports: [FormsModule, NgbAccordionModule, CommonModule, BookPageViewerComponent],
  templateUrl: './book-info-panel.component.html',
  styleUrl: './book-info-panel.component.scss'
})
export class BookInfoPanelComponent implements OnInit {
  isAnonymous: boolean = true;
  currentTab: string = 'contents';
  bookTitle: string = "";
  bookImage: string = "";
  bookSummary: string = "";
  bookData: any;
  relatedBookList: any;
  bookDescription: any;
  searchInsideQuery: string = "";
  tocList: { [key: string]: { title: string; pageCount: string, originalNumber: number }[] } = {};
  bookDataLoader: boolean = false;
  isFav: boolean = false;
  isDataFetched: boolean = false;

  constructor(private apiService: ApiService,
    private modalService: NgbModal,
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.isAnonymous = this.AuthService.isAnonymous();
    this.route.queryParams.subscribe(params => {
      this.fetchBookData(params['guid']);
    });
  }

  private fetchBookData(guid: string): void {
    this.bookDataLoader = true;
    this.apiService.getBookDetails(guid).subscribe(
      (response: any) => {
        this.bookDataLoader = false;
        this.isDataFetched = true;
        this.bookData = JSON.parse(response.body);
        this.setBookCardData();
        this.loadDetailsTabData();
        this.groupTocList(this.bookData?.toc?.result);
        console.log('Book data fetched successfully:', this.bookData);
      },
      (error: any) => {
        this.bookDataLoader = false;
        this.router.navigate([''])
        console.error('Error fetching book data:', error);
      }
    );
  }
  setBookCardData() {
    this.bookTitle = this.bookData.title;
    this.bookSummary = "@ " + this.bookData.year + " | " + this.bookData.authors + " | " + this.bookData.source;
    this.bookImage = `https://createqa.mheducation.com/covers/${this.bookData.coreIsbn}.jpeg`;
  }

  groupTocList(items: any): void {

    items.forEach((item: any) => {

      if (item.title === "Front Matter" || item.title === "Back Matter" || item.pagecount === "0") {
        if (!this.tocList[item.title]) {
          this.tocList[item.title] = [];
        }
        const results = Array.isArray(item?.toc?.result) ? item.toc.result : [];
        if (!Array.isArray(item?.toc?.result)) {
          this.tocList[item.title].push({
            title: item?.toc?.result?.title,
            pageCount: item?.toc?.result?.pagecount,
            originalNumber: item?.toc?.result?.originalnumber
          });
        }
        else {
          const filteredResults = results.map((tocItem: any) => ({
            title: tocItem?.title,
            pageCount: tocItem?.pagecount,
          }));
          console.log(filteredResults);
          this.tocList[item.title].push(...filteredResults);
        }
      }
      else {
        this.tocList["Front Matter"].push({ title: item.title, pageCount: item.pagecount, originalNumber: item.originalnumber });
      }

    });
  }

  handleSign() {
    const modalRef = this.modalService.open(LoginComponent, { centered: false });
    modalRef.result.then(() => {
      this.isAnonymous = false;
    }, () => {
      this.isAnonymous = true;
    });
  }
  handleAddToFavourite() {
    // Logic
  }
  loadDetailsTabData() {
    this.relatedBookList = this.bookData.relationships.relationship;
    this.bookDescription = this.bookData.description;
  }
  setActiveTab(tab: string): void {
    this.currentTab = tab;
    if (tab === "details") {
      this.loadDetailsTabData();
    }
  }
  isActive(tab: string): boolean {
    return this.currentTab === tab;
  }
  handleSearchInside(): void {
    const payload = JSON.parse(JSON.stringify(search_inside_config));
    payload.search.query = this.searchInsideQuery;
    payload.search.token = "1";
    payload.search.guid = "99c9fd84-bc04-37a0-ab66-4a43927a421e";
    this.apiService.getSearchInsideList(payload).subscribe(
      (response: any) => {
        this.bookData = JSON.parse(response.body).result;
        console.log('Book inside data fetched successfully:', this.bookData);
      },
      (error: any) => {
        console.error('Error inside fetching book data:', error);
      }
    );
  }
  openRelatedBook(index: number) {
    this.isDataFetched = false;
    this.fetchBookData(this.relatedBookList[index]['@attributes'].guid);
  }
  addToFav() {
    // Logic to add book to favourites
    this.isFav = !this.isFav;
  }
  setPageNumber() {

  }
}
