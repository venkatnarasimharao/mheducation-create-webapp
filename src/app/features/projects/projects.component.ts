import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../core/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-projects',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit {
  ActiveProjects: any;
  ArchivedProjects: any;
  ThrashedProjects: any;
  currentProject: any;
  constructor(private apiService: ApiService) { }
  // archived

  ngOnInit(): void {
    this.apiService.getProjectList("active").subscribe((projects) => {
      this.ActiveProjects = JSON.parse(projects.body);
      console.log(this.ActiveProjects, "ActiveProjects");
    });
    this.apiService.getProjectList("archived").subscribe((projects) => {
      this.ActiveProjects = JSON.parse(projects.body);
      console.log(this.ActiveProjects, "ActiveProjects");
    });
    this.apiService.getProjectList("trashed").subscribe((projects) => {
      this.ThrashedProjects = JSON.parse(projects.body);
      console.log(this.ThrashedProjects, "ThrashedProjects");
      this.groupedProjects(this.ThrashedProjects.project)
    });
    this.apiService.getProjectList("current").subscribe((projects) => {
      this.currentProject = JSON.parse(projects.body);
      console.log(this.currentProject, "currentProject");
    });
  }
  groupedProjects(projects: any) {
    projects.map((project: any) => ({
      title: project.title,
      pageCount: project.pageCount,
      createdBy: project.email,
      createdDate: new Date(project.createdDate).toLocaleDateString(),
      lastModified: new Date(project.lastModified).toLocaleDateString(),
      bookType: project.bookType,
      status: project.status
    }));
  }
}

