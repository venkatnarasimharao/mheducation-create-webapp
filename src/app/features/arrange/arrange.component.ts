import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/services/api/api.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { ProjectItem, Section } from '../../shared/models/search.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PROJECT_ARRANGE_CONFIG } from '../../shared/constants/search-payload.config';

@Component({
  selector: 'hec-arrange',
  standalone: true,
  imports: [NgbModule, NgbCollapseModule, FormsModule, CdkDrag, DragDropModule],
  templateUrl: './arrange.component.html',
  styleUrls: ['./arrange.component.scss'],
})
export class ArrangeComponent implements OnInit {
  isCollapsed: { [key: string]: boolean } = {
    introMaterial: false,
    bookContent: false,
    backMaterials: false,
    supplements: false,
  };

  selectAllChecked: boolean = false;
  isAnyCheckboxSelected: boolean = false;

  selectedProject: any = '';
  projectList: any[] = [];
  projectStructureEntries: any[] = [];

  isLoading: boolean = false;
  error: string | null = null;
  projectId: string = '';

  arrangeSpinner: boolean = false;
  projectLoadError: string | null = null;

  draggedItems: ProjectItem[] = [];
  sections: any[] = [];
  pricingData: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['projectId'];
      this.getProjectList();
    });
  }

  getProjectList() {
    this.apiService.getProjectList().subscribe((projects: any) => {
      console.log(projects);
      if (projects.ok) {
        const data = JSON.parse(projects.body);
        this.projectList = data.project.map((item: any) => ({
          id: item.guid,
          name: item.title,
        }));
        if (this.projectId) {
          const selectedProject = this.projectList.filter((e: any) => {
            return e.id === this.projectId;
          });
          this.selectedProject = selectedProject?.length
            ? selectedProject[0]
            : {};
          this.getProjectArrangeList();
          this.loadProjectPrice();
        }
      }
    });
  }

  loadProjectPrice(): void {
    this.pricingData = {};

    this.apiService.getProjectPricing(this.projectId).subscribe({
      next: (response) => {
        console.log(response, 'pricing data in loadprice');
        if (response.ok) {
          const price = JSON.parse(response.body);
          price.assetprices.assetprice.forEach((asset: any) => {
            const assetId = asset?.assetId;
            const priceValue = asset.prices?.price?.value;
            if (assetId && priceValue) {
              this.pricingData[assetId] = parseFloat(priceValue).toFixed(2);
            }
          });
          console.log(price, 'Processed pricing data:', this.pricingData);
        }
      },
    });
  }

  getProjectArrangeList(): void {
    this.arrangeSpinner = true;
    this.projectLoadError = null;

    this.apiService.getProjectData(this.projectId).subscribe((data: any) => {
      this.arrangeSpinner = false;
      if (data.ok) {
        const result = JSON.parse(data.body);
        console.log('Project data response', result);

        this.sections = [
          {
            id: 'introMaterial',
            title: 'Introductory Material',
            selectAllChecked: false,
            items: [],
          },
          {
            id: 'bookContent',
            title: 'Book Content',
            selectAllChecked: false,
            items: [],
          },
          {
            id: 'backMaterials',
            title: 'Back Materials',
            selectAllChecked: false,
            items: [],
          },
          {
            id: 'supplements',
            title: 'Supplements',
            selectAllChecked: false,
            items: [],
          },
        ];
        this.projectStructureEntries = result?.structure?.entry || [];

        for (const row of this.projectStructureEntries) {
          if (row.subtype === 'frontmatter') {
            this.sections[0].items = row.entry;
          } else if (row.subtype === 'contents') {
            this.sections[1].items = row.entry;
          } else if (row.subtype === 'backmatter') {
            this.sections[2].items = row.entry;
          }
          else {
            this.sections[3].items = row.entry;
          }
        }
      }
    });
  }
  private processStructureEntries(entries: any[]): void {
    entries.forEach((entry) => {
      if (entry.entry && Array.isArray(entry.entry)) {
        entry.entry.forEach((item: any) => {
          const processedItem = this.processItem(item);
          console.log('processedItem Loading:', entries);
      
          if (item.entry && Array.isArray(item.entry)) {
            this.processStructureEntries([item]);
          }
        });
      }
    });
  }

  private processItem(entry: any): ProjectItem | null {
    if (!entry) return null;
    const attrs = entry;
    const guid = attrs.guid;
    let priceDisplay = this.pricingData || 'N/A';

    console.log('Processing item:', attrs.computedtitle, 'GUID:', guid);
    console.log('Available pricing data:', this.pricingData);

    if (guid && this.pricingData?.guid) {
      priceDisplay = `$${this.pricingData[guid]}`;
      console.log(
        `Found direct price for ${attrs.computedtitle}: ${priceDisplay}`
      );
    }
    console.log(
      attrs,
      `Final price for ${attrs.computedtitle}: ${priceDisplay}`
    );

    return {
      guid: guid,
      name: attrs.computedtitle || attrs.title,
      pages: parseInt(attrs.pagecount) || 0,
      price: priceDisplay,
      checked: false,
      disableUp: false,
      disableDown: false,
      type: attrs.type || entry.type || entry.structuraltype,
      subType: attrs.subType || '',
    };
  }

  toggleCollapse(sectionId: string) {
    this.isCollapsed[sectionId] = !this.isCollapsed[sectionId];
  }

  checkIfAnySelected() {
    this.isAnyCheckboxSelected = this.sections.some((section) =>
      section.items.some((item: { checked: boolean }) => item.checked)
    );
    console.log(
      'isAnyCheckboxSelected: checked triggered',
      this.isAnyCheckboxSelected
    );
  }

  deleteSelectedItems() {
    this.sections.forEach((section) => {
      section.items = section.items.filter(
        (item: { checked: boolean }) => !item.checked
      );
    });
    this.checkIfAnySelected();
  }

  drop(event: CdkDragDrop<ProjectItem[]>) {
    const sourceSection = this.sections.find(s => s.id === event.previousContainer.id);
    const targetSection = this.sections.find(s => s.id === event.container.id);
  
    if (!sourceSection || !targetSection) return;

    const selectedItems = sourceSection.items.filter((item: ProjectItem) => item.checked);
    const itemsToMove = selectedItems.length > 0 ? selectedItems : [sourceSection.items[event.previousIndex] as ProjectItem];

    if (event.previousContainer === event.container) {
  
      const unselectedItems = sourceSection.items.filter((item: ProjectItem) => !item.checked);
      sourceSection.items = [
        ...unselectedItems.slice(0, event.currentIndex),
        ...itemsToMove,
        ...unselectedItems.slice(event.currentIndex)
      ];
    } else {

      sourceSection.items = sourceSection.items.filter((item: ProjectItem) => 
        !itemsToMove.includes(item)
      );
      
      targetSection.items.splice(event.currentIndex, 0, ...itemsToMove);
    }

    this.sections.forEach((section: Section) => {
      section.items.forEach((item: ProjectItem) => item.checked = false);
      section.selectAllChecked = false;
    });

    this.draggedItems = [];
}
  

  handleKeyboardDrag = (event: KeyboardEvent, currentSection: Section, item: ProjectItem) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
  
    const currentSectionIndex = this.sections.indexOf(currentSection);
    const currentIndex = currentSection.items.indexOf(item);
  
    if (currentIndex === -1) return;
  
    let newIndex = currentIndex;
    let targetSectionIndex = currentSectionIndex;
  
    if (event.key === 'ArrowUp') {
      if (currentIndex === 0 && currentSectionIndex > 0) {
        targetSectionIndex = currentSectionIndex - 1;
        newIndex = this.sections[targetSectionIndex].items.length - 1;
      } else {
        newIndex = Math.max(0, currentIndex - 1);
      }
    } else if (event.key === 'ArrowDown') {
      if (currentIndex === currentSection.items.length - 1 && currentSectionIndex < this.sections.length - 1) {
        targetSectionIndex = currentSectionIndex + 1;
        newIndex = 0;
      } else {
        newIndex = Math.min(currentSection.items.length - 1, currentIndex + 1);
      }
    }
  

    if (currentSectionIndex === targetSectionIndex) {
      currentSection.items.splice(currentIndex, 1);
      currentSection.items.splice(newIndex, 0, item);
    } else {
      currentSection.items.splice(currentIndex, 1);
      this.sections[targetSectionIndex].items.splice(newIndex, 0, item);
    }
    setTimeout(() => {
      const dragButtons = document.querySelectorAll('.bi-arrows-expand');
      if (dragButtons && dragButtons[newIndex]) {
        (dragButtons[newIndex] as HTMLElement).focus();
      }
    });
  };
  
 
  onSelect(item: { id: string; name: string }) {
    this.selectedProject = item;
    this.projectLoadError = null;
    this.router.navigate(['/arrange'], {
      queryParams: { projectId: item.id },
    });
  }
}
