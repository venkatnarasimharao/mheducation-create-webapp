import { AuthService } from './../../core/services/auth/auth.service';
import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { search_inside_config } from '../../shared/constants/search-payload.config';
import { LoginComponent } from '../../shared/components/login/login.component';
import { NgbAccordionModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BookPageViewerComponent } from '../book-page-viewer/book-page-viewer.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hec-book-info-panel',
  standalone: true,
  imports: [FormsModule, NgbAccordionModule, CommonModule, BookPageViewerComponent, NgbNavModule],
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
  tocList: { [key: string]: { title: string; pageCount: string, originalNumber: number, guid: string }[] } = {};
  bookDataLoader: boolean = false;
  isFav: boolean = false;
  isDataFetched: boolean = false;
  bookInsideData: any = [];
  expanded: { [key: number]: boolean } = {};
  currentChapter: any;
  isSearchInsideLoader: boolean = false;
  isCompletedSearchInside = false;


  constructor(private apiService: ApiService,
    private modalService: NgbModal,
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.isAnonymous = this.apiService.isAnonymous();
    let previousGuid: string | null = null;
    this.route.queryParams.subscribe(params => {
      const currentGuid = params['guid'];
      const currentPart = params['part'];
      const currentChapter = params['Chapter'];
      if (currentGuid && currentGuid !== previousGuid) {
        previousGuid = currentGuid;
        this.fetchBookData(currentGuid);
      }
      else if (currentPart && currentChapter) {
        this.setCurrentChapter(currentPart, currentChapter);
      }
      // this.fetchBookData(params['guid']);
    });
    this.AuthService.loginStatus$.subscribe((status) => {
      if (status === 'success') {
        this.isAnonymous = false;
      }
    });
  }

  private fetchBookData(guid: string): void {
    this.bookDataLoader = true;
    this.apiService.getBookDetails(guid).subscribe(
      (response: any) => {
        if (response.ok) {
          this.bookDataLoader = false;
          this.isDataFetched = true;
          this.bookData = JSON.parse(response.body);
          this.setBookCardData();
          this.loadDetailsTabData();
          this.groupTocList(this.bookData?.toc?.result);

          this.setCurrentChapter(Object.keys(this.tocList)[0], 0);
          // TODO: having in route
        }

      },
      (error: any) => {
        this.bookDataLoader = false;
        this.router.navigate([''])
        console.error('Error fetching book data:', error);
      }
    );
  }
  getObjectKey(item: any) {
    return Object.keys(item);
  }
  getObjectValue(item: any, index: number) {
    const values = Object.values(item);
    return Array.isArray(values[index]) ? values[index] : [];
  }
  setBookCardData() {
    this.bookTitle = this.bookData?.title;
    this.bookSummary = (this.bookData?.year ? (" © " + this.bookData?.year) : "") + (this.bookData?.authors ? " | " + this.bookData.authors : "") + (this.bookData?.source ? " | " + this.bookData?.source : "");
    this.bookImage = `https://createqa.mheducation.com/covers/${this.bookData.isbn}.jpeg`;
  }
  setCurrentChapter(part: any, Chapter: any) {
    this.currentChapter = this.tocList[part][Chapter];
    this.router.navigate([], {
      queryParams: { part, Chapter },
      queryParamsHandling: 'merge', // Keeps existing query params and updates the specified ones
    });
    console.log(`Current Chapter`);

  }
  groupTocList(items: any): void {
    let previousPart = "";
    items.forEach((item: any) => {

      if (item.type === "Part") {
        previousPart = item.originalnumber ? (item.originalnumber + ". " + item.title) : item.title;

        if (!this.tocList[previousPart]) {
          this.tocList[previousPart] = [];
        }
        const results = Array.isArray(item?.toc?.result) ? item.toc.result : [];
        if (!Array.isArray(item?.toc?.result)) {
          this.tocList[previousPart].push({
            title: item?.toc?.result?.title,
            pageCount: item?.toc?.result?.pagecount,
            originalNumber: item?.toc?.result?.originalnumber,
            guid: item?.toc?.result?.guid
          });
        }
        else {
          const filteredResults = results.map((tocItem: any) => ({
            title: tocItem?.title,
            pageCount: tocItem?.pagecount,
            orignalNumber: tocItem.originalnumber,
            guid: tocItem?.guid
          }));
          this.tocList[previousPart].push(...filteredResults);
        }
      }
      else {
        if (previousPart != "") {
          this.tocList[previousPart].push({ title: item.title, pageCount: item.pagecount, originalNumber: item.originalnumber, guid: item.guid });
        }
        else {
          if (!this.tocList["individual"]) {
            this.tocList["individual"] = [];
          }
          this.tocList["individual"].push({ title: item.title, pageCount: item.pagecount, originalNumber: item.originalnumber, guid: item.guid });

        }

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
  addBook() {
    // Logic
    console.log("add book to project functionality not yet implemented")
  }
  loadDetailsTabData() {
    this.relatedBookList = this.bookData.relationships.relationship;
    this.bookDescription = this.bookData.description;
    // console.log(this.bookInsideData, "hey");
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
  handleSearchInside(token: number): void {
    const payload = JSON.parse(JSON.stringify(search_inside_config));
    payload.search.query = this.searchInsideQuery;
    payload.search.token = token;
    console.log(this.bookData);
    payload.search.guid = this.bookData.guid;
    this.isSearchInsideLoader = true;


    //   this.apiService.getSearchInsideList(payload)
    //     .pipe(
    //       map((response: any) => {
    //         const parsedResponse = JSON.parse(response.body);
    //         // Process the 'result' data here if needed
    //         const formattedResult = parsedResponse.result.map((item: any) => {
    //           if (item.content) {
    //             console.log(item.content);
    //             if (typeof item.content.para === 'string') {
    //               // Handle plain strings
    //               console.log(item.content.para)
    //               return item;
    //             } else if (item.content.para?.__text && item.content.para.match) {
    //               // Replace \n with .match in bold
    //               const boldMatch = Array.isArray(item.content.para.match) ? item.content.para.match[0] : item.content.para.match;
    //               return item.content.para.__text.replace(/\n/g, ` <b>${boldMatch}</b> `);
    //             } else if (item.content.para?.__text) {
    //               // If only __text is present
    //               return item.__text;
    //             }
    //             return '';
    //           }
    //         }).filter((line: string) => line.trim() !== ''); // Remove empty lines

    //         return formattedResult;
    //       })
    //     )
    //     .subscribe(
    //       (bookInsideData: any) => {
    //         this.bookInsideData = bookInsideData;
    //         console.log('Book inside data fetched successfully:', this.bookInsideData);
    //       },
    //       (error: any) => {
    //         console.error('Error inside fetching book data:', error);
    //       }
    //     );

    // 
    this.apiService.getSearchInsideList(payload).subscribe((res) => {
      this.isSearchInsideLoader = false;
      if (res.ok) {
        const parsedResponse = JSON.parse(res.body).result
        if (parsedResponse) {
          parsedResponse.map((item: any) => {
            this.bookInsideData.push({ title: item.meta.sub.title, desc: item.content });
          })
        }
        else {
          this.isCompletedSearchInside = true;
        }
      }

    },
      (err: any) => {
        console.error('Error search inside fetching book data:', err);
        this.isSearchInsideLoader = false;
      }
    )

  }
  openRelatedBook(index: number) {
    this.isDataFetched = false;
    this.fetchBookData(this.relatedBookList[index].guid);

  }
  addToFav() {
    // Logic to add book to favourites
    this.isFav = !this.isFav;
  }
  toggleExpand(index: number) {
    this.expanded[index] = !this.expanded[index];
  }
  onScroll(event: any) {
    if (this.isCompletedSearchInside || this.isSearchInsideLoader) {
      return;
    }
    const element = event.target;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 2) {
      this.handleSearchInside(this.bookInsideData.length + 1); // Fetch more data
    }

  }
}
