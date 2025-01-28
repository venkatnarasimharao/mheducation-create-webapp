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
          } else {
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
    const sourceSection = this.sections.find(
      (s) => s.id === event.previousContainer.id
    );
    const targetSection = this.sections.find(
      (s) => s.id === event.container.id
    );

    if (!sourceSection || !targetSection) return;

    const itemsToMove =
      this.draggedItems.length > 0
        ? this.draggedItems
        : [sourceSection.items[event.previousIndex] as ProjectItem];

    if (event.previousContainer === event.container) {
      const unselectedItems = sourceSection.items.filter(
        (item: ProjectItem) => !itemsToMove.includes(item)
      );
      sourceSection.items = [
        ...unselectedItems.slice(0, event.currentIndex),
        ...itemsToMove,
        ...unselectedItems.slice(event.currentIndex),
      ];
    } else {
      sourceSection.items = sourceSection.items.filter(
        (item: ProjectItem) => !itemsToMove.includes(item)
      );

      targetSection.items.splice(event.currentIndex, 0, ...itemsToMove);
    }

    this.sections.forEach((section: Section) => {
      section.items.forEach((item: ProjectItem) => (item.checked = false));
      section.selectAllChecked = false;
    });

    this.draggedItems = [];
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
        // Move within same section
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
        // Move to previous section
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
        // Move within same section
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
        // Move to next section
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
