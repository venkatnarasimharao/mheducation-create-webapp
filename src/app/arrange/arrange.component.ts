import { Component } from '@angular/core';
import { ProjectsHeadingComponent } from '../projects-heading/projects-heading.component';
import { FormatTocComponent } from '../format-toc/format-toc.component';

@Component({
  selector: 'app-arrange',
  standalone: true,
  imports: [ProjectsHeadingComponent,FormatTocComponent],
  templateUrl: './arrange.component.html',
  styleUrl: './arrange.component.scss'
})
export class ArrangeComponent {

}
