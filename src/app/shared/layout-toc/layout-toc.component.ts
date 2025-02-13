import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hec-layout-toc',
  standalone: true,
  imports: [NgbModule, FormsModule],
  templateUrl: './layout-toc.component.html',
  styleUrl: './layout-toc.component.scss'
})
export class LayoutTocComponent {
  fonts: string[] = ['Proxima Nova', 'Arial', 'Times New Roman', 'Roboto', 'Verdana'];

  selectedFont = {
    part: 'Proxima Nova',
    chapter: 'Proxima Nova',
    lesson: 'Proxima Nova'
  };

  pageNumberStyle: string = 'dots';

  selectFont(section: 'part' | 'chapter' | 'lesson', font: string) {
    this.selectedFont[section] = font;
  }
}
