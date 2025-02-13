import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { LayoutTocComponent } from '../../layout-toc/layout-toc.component';

@Component({
  selector: 'hec-arrange-toc',
  standalone: true,
  imports: [NgbModule, FormsModule, CommonModule, LayoutTocComponent],
  templateUrl: './arrange-toc.component.html',
  styleUrl: './arrange-toc.component.scss'
})
export class ArrangeTocComponent implements OnInit {
  ebookDelivery: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getArrangeTocData();
  }

  getArrangeTocData() {
    this.apiService.getArrangeTocEbookDelivery().subscribe(
      (response: any) => {
        console.log('Full API Response:', response.body);
        if (response.body) {
          this.ebookDelivery = JSON.parse(response.body);
          console.log('Extracted TOC Data:', this.ebookDelivery);
        } else {
          console.warn('Unexpected API response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching TOC data:', error);
      }
    );
  }
  
  getPartNumber(index: number): number {
    let count = 1; // Start count from 1
    for (let i = 0; i < index; i++) {
      if (this.ebookDelivery?.nonReaderCompatibleAssets?.asset[i]?.type === 'Part') {
        count++;
      }
    }
    return count;
  }
  
  getChapterNumber(index: number): number {
    if(index<3) return 0;
    let count = 1; // Start count from 1
    for (let i = 3; i < index; i++) {
      if (this.ebookDelivery?.nonReaderCompatibleAssets?.asset[i]?.type === 'Chapter') {
        count++;
      }
    }
    return count;
  }
}
