import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { jsPDF } from 'jspdf';
import { CommonStateService } from '../../core/services/common-state/common-state.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'hec-projects',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule, NgbDropdownModule, NgbDropdownToggleNoCaretDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  imageUrl: string="";
  projectUpdateLoader:boolean=false;
  projectTypes = ["current", "active", "archived", "trashed"];
  allProjects: { [key: string]: any[] } = {};
  projectLoader: boolean = false;
  constructor(private apiService: ApiService,
    private commonStateService: CommonStateService,
    private router: Router,
    private cookiesService: CookieService
  ) { }
  ngOnInit(): void {
      this.projectUpdateLoader=true;
      this.apiService.getProjectList("active").subscribe((projects) => {
        this.projectUpdateLoader=false;
        const parsedProjects = JSON.parse(projects.body);
        const grouped = this.groupedProjects(parsedProjects.project || []);
        this.allProjects["active"] = grouped;
      });
  }
  downloadToc(project:any){
    project.downloadLoader =true;
    this.apiService.getProjectToc(project.guid).subscribe({
      next: (data) => {
        project.downloadLoader =false;
        const blob = new Blob([data.body], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.imageUrl = url;
        console.log(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.title}.pdf`;
        a.click();
      },
      error: (error) => {
        project.downloadLoader =false;
        console.error('Error fetching document:', error);
      }
    })
  }
  createNewProject(){
    alert("create new project popup is not ready")
  }
  getProject(projectType:any){
    if(this.allProjects[projectType]){
      return;
    }
    this.projectUpdateLoader=true;
    this.apiService.getProjectList(projectType).subscribe((projects) => {
      this.projectUpdateLoader=false;
      const parsedProjects = JSON.parse(projects.body);
      const grouped = this.groupedProjects(parsedProjects.project || []);
      this.allProjects[projectType] = grouped;
    });
  }
  refreshProjects(projectTypes: any[]) {
    this.projectUpdateLoader = true;
    const projectTypesString = projectTypes.join(',');
    this.apiService.getProjectList(projectTypesString).subscribe({
      next: (projects) => {
        this.projectUpdateLoader = false;
        const parsedProjects = JSON.parse(projects.body);
        console.log(parsedProjects);
        
        // Optional: You can perform further actions like grouping or storing projects
        // const grouped = this.groupedProjects(parsedProjects.project || []);
        // this.allProjects[projectType] = grouped;
      },
      error: (error) => {
        this.projectUpdateLoader = false;
        console.error('Error fetching project list:', error);
      }
    });
  }
  
  requestReview(project:any){
    const guid = project.guid;
    this.router.navigate(['/personalize'], { queryParams: { guid } });
  }
  getCoverUrl(project: any) {
    if(project.bookCover){
      return this.commonStateService.getImageUrl( `/createonline/covers/personalize/${project.bookCover}_Thumb.png`,false);
    }
    return this.commonStateService.getImageUrl('/createonline/images/unknown-cover.png',false);
  }
  shareCopy(project:any){
    // open a modal to share
    alert("share copy popup is not ready")
  }
  duplicateProject(project:any){
    this.projectUpdateLoader=true;
    this.apiService.checkActiveProject(project.guid).subscribe((res)=>{
      this.projectUpdateLoader=false;
      console.log(res);
      this.apiService.duplicateProject(project.guid).subscribe((res)=>{
        console.log(res);
        if(res.status ==='success'){
          alert("Project duplicated successfully");
        }
      })
    })

  }
  updatePayload(payload:any,projectType:string){
    const newPayload = {project:payload}
    newPayload.project['archivedState'] =projectType;
    return newPayload;
  }
  
  changeProjectType(project: any, projectType: string) {
    this.projectUpdateLoader = true;
    let payload;
    
    // Get project details
    this.apiService.getProjectDetails(project.guid).subscribe(
      (data) => {
        console.log(data.body);
          payload = JSON.parse(data.body); 
          console.log(payload);
          const updatePayload = this.updatePayload(payload, projectType);
          console.log(updatePayload);
          
          // Update project type
          this.apiService.updateProjectType(project.guid, updatePayload).subscribe(
            (data) => {
              this.projectUpdateLoader = false;
                const response = JSON.parse(data.body);
                console.log(response);
              
            },
            (error) => {
              this.projectUpdateLoader = false;
              console.error('Error updating project type:', error);
            }
          );
       
      },
      (error) => {
        this.projectUpdateLoader = false;
        console.error('Error fetching project details:', error);
      }
    );
  }
  
  groupedProjects(projects: any) {
    if (!Array.isArray(projects)) {
      projects = [projects];
    }
    console.log(projects);
    return projects.map((project: any) => ({
      title: project.title,
      pageCount: project.pageCount,
      createdBy: this.cookiesService.get('user_email'),
      createdDate: new Date(project.createdDate),
      lastModified: new Date(project['last-modified']),
      bookType: project.bookType,
      status: project.status,
      price: project.pricebw,
      guid:project.guid,
      bookCover:project.bookCover,
    }));
  }


}
