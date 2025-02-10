import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/services/api/api.service';
import { catchError, finalize, map } from 'rxjs/operators';
import {
  ApiEntry,
  ProjectItem,
  Section,
} from '../../shared/models/search.model';
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

  reArrangeProjectOrder: any = PROJECT_ARRANGE_CONFIG;

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
  private initialProjectStructure: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private cdr: ChangeDetectorRef
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
          id: item._guid,
          name: item._title,
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
            console.log(response, 'Raw pricing data in loadProjectPrice');

            if (response.ok) {
                const price = JSON.parse(response.body);
                console.log(price, 'Parsed price data');

                if (!Array.isArray(price.assetprices?.assetprice)) {
                    // console.error('assetprice is not an array:', price.assetprices?.assetprice);
                    return;
                }

                price.assetprices.assetprice.forEach((asset: any, index: number) => {
                    // console.log(asset, `Processing asset at index ${index}`);

                    const assetId = asset?._assetId;
                    const priceValue = asset?.prices?.price?._value;

                    if (assetId && priceValue !== undefined) {
                        this.pricingData[assetId] = parseFloat(priceValue).toFixed(2);
                    } else {
                        console.warn(`Skipping asset at index ${index} due to missing data`, asset);
                    }
                });

                // console.log('Processed pricing data:', this.pricingData);
            }
        },
        error: (err) => {
            console.error('API call failed:', err);
        }
    });
}


  getProjectArrangeList(): void {
    this.arrangeSpinner = true;
    this.projectLoadError = null;

    this.apiService.getProjectData(this.projectId).subscribe((data: any) => {
      this.arrangeSpinner = false;
      console.log('Project data data is here', data);
      if (data.ok) {
        const result = JSON.parse(data.body);
        console.log('Project data response', result);

        this.initialProjectStructure = JSON.parse(JSON.stringify(result));
        console.log('initial project structure', this.initialProjectStructure);
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
          if (row._subtype === 'frontmatter') {
            this.sections[0].items = row.entry;
          } else if (row._subtype === 'contents') {
            this.sections[1].items = row.entry;
          } else if (row._subtype === 'backmatter') {
            this.sections[2].items = row.entry;
          } else {
            this.sections[3].items = row.entry;
          }
        }
      }
    });
  }

  createRearrangedProjectOrder(): any {
    // Create a deep copy of the initial project structure
    const updatedStructure = JSON.parse(JSON.stringify(this.initialProjectStructure));

    // Rebuild the structure entries based on current sections
  // Carefully reconstruct the structure to match API expectations
  updatedStructure.structure.entry = this.sections.map(section => {
    const sectionSubtype = this.getSectionSubtype(section.id);
    return {
      _type: "Container",
      _subtype: sectionSubtype,
      entry: section.items.map((item :any) => ({
        ...item, // Preserve original item properties
        _subtype: sectionSubtype // Ensure consistent subtype
      })
    )};
  });

  return {
    project: {
      ...updatedStructure,
      _status: updatedStructure._status || 'DRAFT',
      // _projectrevision: (parseInt(updatedStructure._projectrevision) + 1).toString(),
      // _dateModified: new Date().toUTCString()
    }
  };
}
 
sanitizePayload(payload: any): any {
  const sanitize = (obj: any): any => {
    if (obj === null || obj === undefined) return '';
    
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map(sanitize);
      }
      
      const sanitizedObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitizedObj[key] = sanitize(value);
      }
      
      // If object is empty, return empty string
      return Object.keys(sanitizedObj).length === 0 ? '' : sanitizedObj;
    }
    
    return obj;
  };

  return sanitize(payload);
}

saveProjectData(): void {
  this.reArrangeProjectOrder = this.createRearrangedProjectOrder();

  const sanitizedPayload = this.sanitizePayload(this.reArrangeProjectOrder);
  console.log('Payload to be sent:', JSON.stringify(this.reArrangeProjectOrder, null, 2));
  this.apiService
    .saveProjectData(this.projectId, this.reArrangeProjectOrder)
    .subscribe({
      next: (response) => {
        console.log('Project updated successfully', response);
        this.initialProjectStructure = JSON.parse(
          JSON.stringify(sanitizedPayload.project)
        );
      },
      error: (error) => {
        console.error('Error saving project:', error);
        console.error('Error details:', error.message);
        console.error('Error response:', error.error);
      },
    });
}
  private getSectionSubtype(sectionId: string): string {
    const subtypeMap: { [key: string]: string } = {
      introMaterial: 'frontmatter',
      bookContent: 'contents',
      backMaterials: 'backmatter',
      supplements: 'supplements',
    };
    return subtypeMap[sectionId] || '';
  }

  // private hasProjectStructureChanged(): boolean {
  //   const currentStructure = {
  //     project: {
  //       structure: {
  //         entry: this.sections.map(section => ({
  //           entry: section.items,
  //           _type: "Container",
  //           _subtype: this.getSectionSubtype(section.id)
  //         }))
  //       }
  //     }
  //   };

  //   return JSON.stringify(this.initialProjectStructure) !==
  //     JSON.stringify(currentStructure.project.structure);
  // }

  toggleCollapse(sectionId: string) {
    this.isCollapsed[sectionId] = !this.isCollapsed[sectionId];
  }

  checkIfAnySelected(): void {
    this.isAnyCheckboxSelected = this.sections.some((section) =>
      section.items.some((item: { checked: boolean }) => item.checked)
    );
    console.log(
      'isAnyCheckboxSelected: checked triggered',
      this.isAnyCheckboxSelected
    );
  }

  toggleSelectAll(section: Section): void {
    section.items.forEach((item: ProjectItem) => {
      item.checked = section.selectAllChecked;
    });
    this.checkIfAnySelected();
  }

  updateSelectAllState(section: Section): void {
    const allChecked = section.items.every((item: ProjectItem) => item.checked);
    const someChecked = section.items.some((item: ProjectItem) => item.checked);

    section.selectAllChecked = allChecked;
  }

  deleteSelectedItems(): void {
    this.sections.forEach((section) => {
      section.items = section.items.filter(
        (item: { checked: boolean }) => !item.checked
      );
    });
    this.checkIfAnySelected();
  }

  drop(event: CdkDragDrop<ProjectItem[]>) {
    // Find source and target sections
    const sourceSection = this.sections.find(
      (s) => s.id === event.previousContainer.id
    );
    const targetSection = this.sections.find(
      (s) => s.id === event.container.id
    );

    // Ensure both sections exist and have valid items arrays
    if (!sourceSection?.items || !targetSection?.items) {
      console.error('Invalid source or target section');
      return;
    }

    // Ensure items arrays are actually arrays
    if (!Array.isArray(sourceSection.items)) {
      sourceSection.items = [];
    }
    if (!Array.isArray(targetSection.items)) {
      targetSection.items = [];
    }

    // Determine items to move
    const itemsToMove =
      this.draggedItems.length > 0
        ? this.draggedItems
        : [sourceSection.items[event.previousIndex] as ProjectItem];

    // Update subtype for moved items based on target section
    const targetSubtype = this.getSectionSubtype(targetSection.id);
    itemsToMove.forEach((item) => {
      item.subType = targetSubtype;
    });
    console.log('After dropped targeted subtype', targetSubtype);

    if (event.previousContainer === event.container) {
      // Moving within the same section
      const unselectedItems = sourceSection.items.filter(
        (item: ProjectItem) => !itemsToMove.includes(item)
      );
      sourceSection.items = [
        ...unselectedItems.slice(0, event.currentIndex),
        ...itemsToMove,
        ...unselectedItems.slice(event.currentIndex),
      ];
    } else {
      // Moving between different sections
      sourceSection.items = sourceSection.items.filter(
        (item: ProjectItem) => !itemsToMove.includes(item)
      );
      targetSection.items.splice(event.currentIndex, 0, ...itemsToMove);
    }

    // Reset checked states
    this.sections.forEach((section: Section) => {
      if (Array.isArray(section.items)) {
        section.items.forEach((item: ProjectItem) => {
          item.checked = false;
        });
        section.selectAllChecked = false;
      }
    });

    this.draggedItems = [];

    // Save changes if the structure has been modified
    // if (this.hasProjectStructureChanged()) { // TODO - identify the difference of rearrangement
   
    this.saveProjectData();
    // }
  }

  handleIconKeydown(
    event: KeyboardEvent,
    currentSection: Section,
    item: ProjectItem
  ): void {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

    event.preventDefault();

    const currentSectionIndex = this.sections.indexOf(currentSection);
    const currentIndex = currentSection.items.indexOf(item);

    if (currentIndex === -1) return;

    if (event.key === 'ArrowUp') {
      if (currentIndex > 0) {
        const [movedItem] = currentSection.items.splice(currentIndex, 1);
        currentSection.items.splice(currentIndex - 1, 0, movedItem);
        this.cdr.detectChanges();

        const row = document.querySelector(
          `[data-section-id="${currentSection.id}"][data-item-index="${
            currentIndex - 1
          }"]`
        );
        const button = row?.querySelector('.bi-arrows-expand') as HTMLElement;
        if (button) button.focus();
      } else if (currentSectionIndex > 0) {
        const prevSection = this.sections[currentSectionIndex - 1];
        const [movedItem] = currentSection.items.splice(currentIndex, 1);
        prevSection.items.push(movedItem);
        this.cdr.detectChanges();

        const row = document.querySelector(
          `[data-section-id="${prevSection.id}"][data-item-index="${
            prevSection.items.length - 1
          }"]`
        );
        const button = row?.querySelector('.bi-arrows-expand') as HTMLElement;
        if (button) button.focus();
      }
    } else if (event.key === 'ArrowDown') {
      if (currentIndex < currentSection.items.length - 1) {
        const [movedItem] = currentSection.items.splice(currentIndex, 1);
        currentSection.items.splice(currentIndex + 1, 0, movedItem);
        this.cdr.detectChanges();

        const row = document.querySelector(
          `[data-section-id="${currentSection.id}"][data-item-index="${
            currentIndex + 1
          }"]`
        );
        const button = row?.querySelector('.bi-arrows-expand') as HTMLElement;
        if (button) button.focus();
      } else if (currentSectionIndex < this.sections.length - 1) {
        const nextSection = this.sections[currentSectionIndex + 1];
        const [movedItem] = currentSection.items.splice(currentIndex, 1);
        nextSection.items.unshift(movedItem);
        this.cdr.detectChanges();

        const row = document.querySelector(
          `[data-section-id="${nextSection.id}"][data-item-index="0"]`
        );
        const button = row?.querySelector('.bi-arrows-expand') as HTMLElement;
        if (button) button.focus();
      }
    }
  }

  getExpandButton(section: Section, index: number): HTMLElement | null {
    const tableRows = Array.from(
      document.querySelectorAll(`[data-section-id="${section.id}"]`)
    );
    const targetRow = tableRows[index];

    if (targetRow) {
      const expandButton = targetRow.querySelector(
        '.bi-arrows-expand'
      ) as HTMLElement;
      return expandButton;
    }

    return null;
  }

  onDragStarted(
    event: CdkDragStart,
    section: Section,
    item: ProjectItem
  ): void {
    const selectedItems = section.items.filter((i: ProjectItem) => i.checked);
    this.draggedItems = selectedItems.length > 0 ? selectedItems : [item];
  }

  onSelect(item: { id: string; name: string }) {
    this.selectedProject = item;
    this.projectLoadError = null;
    this.router.navigate(['/arrange'], {
      queryParams: { projectId: item.id },
    });
  }
}
