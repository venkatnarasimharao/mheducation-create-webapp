import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';

@Component({
  selector: 'hec-projects',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule, NgbDropdownModule, NgbDropdownToggleNoCaretDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projectTypes = ["current", "active", "archived", "trashed"];
  allProjects: { [key: string]: any[] } = {};
  projectLoader: boolean = false;
  constructor(private apiService: ApiService) { }
  // archived
  ngOnInit(): void {
    this.projectTypes.forEach((type) => {
      this.apiService.getProjectList(type).subscribe((projects) => {

        const parsedProjects = JSON.parse(projects.body);
        console.log(parsedProjects, type);
        const grouped = this.groupedProjects(parsedProjects.project || []);
        this.allProjects[type] = grouped;
        console.log(this.allProjects, "allProjects");
      });
    });

  }

  groupedProjects(projects: any) {
    if (!Array.isArray(projects)) {
      projects = [projects];
    }
    return projects.map((project: any) => ({
      title: project.title,
      pageCount: project.pageCount,
      createdBy: project.email,
      createdDate: new Date(project.createdDate),
      lastModified: new Date(project['last-modified']),
      bookType: project.bookType,
      status: project.status,
      price: project.pricebw
    }));
  }

}
