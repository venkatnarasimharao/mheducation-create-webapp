import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownToggleNoCaretDirective } from '../../shared/directives/dropdown-toggle-css.directive';
import { CommonStateService } from '../../core/services/common-state/common-state.service';
import { Router } from '@angular/router';

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
  projectList:any=[];
  constructor(private apiService: ApiService,
    private commonStateService: CommonStateService,
    private router: Router
  ) { }
  ngOnInit(): void {
      this.fetchProjects();
  }
  fetchProjects(){
    this.projectUpdateLoader=true;
    this.apiService.getProjectList().subscribe((projects) => {
      this.projectUpdateLoader=false;
      const parsedProjects = JSON.parse(projects.body);
      this.projectList = parsedProjects.project || [];
      this.groupedProjects(parsedProjects.project || []);
    }
  ,(error)=>{
    console.error('Error fetching projects:', error);
    this.projectUpdateLoader=false;
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
  requestReview(project:any){
    const guid = project.guid;
    this.router.navigate(['/personalize'], { queryParams: { guid } });
  }
  getCoverUrl(project: any) {
    if(project._bookCover){
      return this.commonStateService.getImageUrl( `/createonline/covers/personalize/${project._bookCover}_Thumb.png`,false);
    }
    return this.commonStateService.getImageUrl('/createonline/images/unknown-cover.png',false);
  }
  shareCopy(project:any){
    // open a modal to share
    alert("share copy popup is not ready")
  }
  updateDuplicateProject(guid:any){
    this.projectUpdateLoader=true;
    this.apiService.duplicateProject(guid).subscribe((res)=>{
      this.projectUpdateLoader=false;
      console.log(res);
      this.fetchProjects();
    },
  (error)=>{
    console.error('Error updating duplicates:', error);
    this.projectUpdateLoader=false;
  });
  }
  duplicateProject(project:any){
    this.projectUpdateLoader=true;
    this.apiService.checkActiveProject(project._guid).subscribe((res)=>{
      this.projectUpdateLoader=false;
      console.log(res);
      this.updateDuplicateProject(project._guid);
      
    },
  (error)=>{
    this.projectUpdateLoader=false;
    alert(`Error while updating duplicates:${error}` );
    
  });

  }
  updatePayload(payload:any,projectType:string){
    const newPayload = {project:payload}
    newPayload.project['_archivedState'] =projectType;
    return newPayload;
  }
  updateProject(guid:string,payload:any){
    console.log(payload);
    this.projectUpdateLoader = false;
    this.apiService.updateProjectType(guid, payload).subscribe(
      (data) => {
        this.projectUpdateLoader = false;
          const response = JSON.parse(data.body);
          console.log(response);
          this.fetchProjects();
        
      },
      (error) => {
        this.projectUpdateLoader = false;
        console.error('Error updating project type:', error);
      }
    );
  }
  
  changeProjectType(project: any, projectType: string) {
    console.log(project);
    this.projectUpdateLoader = true;
    let payload;
    this.apiService.getProjectDetails(project._guid).subscribe(
      (data) => {
        console.log(data.body);
          payload = JSON.parse(data.body); 
          const updatePayload = this.updatePayload(payload, projectType);
          console.log(updatePayload,"updatePayload");
          this.updateProject(project._guid, updatePayload);
      },
      (error) => {
        this.projectUpdateLoader = false;
        console.error('Error fetching project details:', error);
      }
    );
  }
  groupedProjects(projects:any){
    if (!Array.isArray(projects)) {
        projects = [projects];
      }
    this.projectList =[];
    projects.forEach((project:any) => {
      const type=project._archivedState || "active";
      if (!this.projectList[type]) {
        this.projectList[type] = [];
      }
      this.projectList[type].push(project)});
      console.log(this.projectList);
  }

}

