import { Component } from '@angular/core';

@Component({
  selector: 'hec-book-info-panel',
  standalone: true,
  imports: [],
  templateUrl: './book-info-panel.component.html',
  styleUrl: './book-info-panel.component.scss'
})
export class BookInfoPanelComponent {
  bookTitle: string = "Biological Investigations: Form, Function, Diversity, and Process, Ninth Edition";
  bookImage: string = "https://createqa.mheducation.com/covers/0073383058.jpeg";
  bookAuthor: string = "Dolphin";
  publishedYear: string = "2011";
  bookSource: string = "McGraw-Hill Higher Education - USA";
  content: string = "@ " + this.publishedYear + " | " + this.bookAuthor + " | " + this.bookSource;

  handleSign() {

  }


}
