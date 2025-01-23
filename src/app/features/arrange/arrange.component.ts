import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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
  selectProjectItems: any[] = [];
  projectStructureEntries: any[] = [];

  isLoading: boolean = false;
  error: string | null = null;
  userId: string = '';
  projectId: string = '';

  arrangeSpinner: boolean = false;
  projectLoadError: string | null = null;

  draggedItems: ProjectItem[] = [];
  sections: any[] = [];
  pricingData: any;
  selectedCheckboxCount: number = 0;
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
        this.updateItemStates();
      }
    });
  }

  saveProjects(projectId: any) {
    const payload = PROJECT_ARRANGE_CONFIG;
    this.apiService
      .saveProjectData(projectId, payload)
      .subscribe((projects: any) => {
        console.log('saveProjects', projects);
        if (projects.ok) {
          const data = JSON.parse(projects.body);
          this.updateItemStates();
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
        }

        // if (this.projectStructureEntries.length) {
        //   this.addItemToAppropriateSection({} as ProjectItem);
        // }

        this.updateItemStates();
      }
    });
  }
  private processStructureEntries(entries: any[]): void {
    entries.forEach((entry) => {
      if (entry.entry && Array.isArray(entry.entry)) {
        entry.entry.forEach((item: any) => {
          const processedItem = this.processItem(item);
          console.log('processedItem Loading:', entries);
          if (processedItem) {
            this.addItemToAppropriateSection(processedItem);
          }
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
      format: this.determineFormat(entry),
      pages: parseInt(attrs.pagecount) || 0,
      price: priceDisplay,
      checked: false,
      disableUp: false,
      disableDown: false,
      type: attrs.type || entry.type || entry.structuraltype,
      subType: attrs.subType || '',
    };
  }

  private determineFormat(item: any): string {
    const isColor = item?._numberInteriorColors === '4';
    const format = isColor ? 'Color' : 'Black & White';
    return `${format}, Print & Digital`;
  }

  private addItemToAppropriateSection(item: ProjectItem): void {
    const traverseEntries = (entries: any[]): void => {
      entries.forEach((entry) => {
        const targetContainer = entry?.subtype?.toLowerCase() || '';

        if (entry) {
          const currentItem = this.processItem(entry);
          if (currentItem) {
            let targetSectionId = '';

            if (targetContainer.includes('frontmatter')) {
              targetSectionId = 'introMaterial';
            } else if (targetContainer.includes('contents')) {
              targetSectionId = 'bookContent';
            } else if (targetContainer.includes('backmatter')) {
              targetSectionId = 'backMaterials';
            } else if (targetContainer.includes('supplement')) {
              targetSectionId = 'supplements';
            }

            const targetSection = this.sections.find(
              (s) => s.id === targetSectionId
            );
            console.log(
              currentItem,
              targetSectionId,
              'check the entry',
              this.sections,
              'targetSection',
              targetSection
            );
            if (targetSection && currentItem?.name) {
              console.log(
                `Adding item "${currentItem.name}" to section: ${targetSectionId}`
              );
              console.log('Target Container:', targetContainer);
              targetSection.items.push(currentItem);
            }
          }
        }

        if (entry.entry) {
          if (Array.isArray(entry.entry)) {
            traverseEntries(entry.entry);
          } else {
            traverseEntries([entry.entry]);
          }
        }
      });
    };

    if (
      this.projectStructureEntries &&
      Array.isArray(this.projectStructureEntries)
    ) {
      traverseEntries(this.projectStructureEntries);
    }
  }

  getAllItems() {
    return this.sections.flatMap((section) => section.items);
  }
  toggleCollapse(sectionId: string) {
    this.isCollapsed[sectionId] = !this.isCollapsed[sectionId];
  }

  toggleAllCheckboxes(section: any) {
    section.items.forEach((item: any) => {
      item.checked = section.selectAllChecked;
    });
    this.checkIfAnySelected();
  }

  checkIfAllSelected(section: any) {
    section.selectAllChecked = section.items.every((item: any) => item.checked);
    this.checkIfAnySelected();
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

  toggleCheckbox(item: any) {
    item.checked = !item.checked;
    console.log('Checkbox toggled:', item);
    this.checkIfAnySelected();
  }

  deleteSelectedItems() {
    this.sections.forEach((section) => {
      section.items = section.items.filter(
        (item: { checked: boolean }) => !item.checked
      );
    });
    this.checkIfAnySelected();
  }
  isFirstItem(sectionIndex: number, itemIndex: number): boolean {
    const allItems = this.getAllItems();
    const globalIndex = this.getGlobalIndex(sectionIndex, itemIndex);
    return globalIndex === 0;
  }

  isLastItem(sectionIndex: number, itemIndex: number): boolean {
    const allItems = this.getAllItems();
    const globalIndex = this.getGlobalIndex(sectionIndex, itemIndex);
    return globalIndex === allItems.length - 1;
  }

  getGlobalIndex(sectionIndex: number, itemIndex: number): number {
    const priorItemsCount = this.sections
      .slice(0, sectionIndex)
      .reduce((count, section) => count + section.items.length, 0);
    return priorItemsCount + itemIndex;
  }

  getConnectedDropLists(): string[] {
    return this.sections.map((section) => section.id);
  }

  drop(event: CdkDragDrop<ProjectItem[]>) {
    if (event.previousContainer === event.container) {
      const sourceSection = this.sections.find(
        (s) => s.id === event.container.id
      );
      if (!sourceSection) return;

      if (this.draggedItems.length > 0) {
        const selectedItems = sourceSection.items.filter(
          (item: ProjectItem) => item.checked
        );
        const draggedIndexes = selectedItems.map((item: ProjectItem) =>
          sourceSection.items.indexOf(item)
        );

        draggedIndexes.sort((a: number, b: number) => b - a);

        const itemsToMove = draggedIndexes
          .map((index: number) => {
            const [removed] = sourceSection.items.splice(index, 1);
            return removed;
          })
          .reverse();

        sourceSection.items.splice(event.currentIndex, 0, ...itemsToMove);
      } else {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      const sourceSection = this.sections.find(
        (s) => s.id === event.previousContainer.id
      );
      const targetSection = this.sections.find(
        (s) => s.id === event.container.id
      );

      if (!sourceSection || !targetSection) return;

      if (this.draggedItems.length > 0) {
        const selectedItems = sourceSection.items.filter(
          (item: ProjectItem) => item.checked
        );
        const draggedIndexes = selectedItems.map((item: ProjectItem) =>
          sourceSection.items.indexOf(item)
        );

        draggedIndexes.sort((a: number, b: number) => b - a);

        const itemsToMove = draggedIndexes
          .map((index: number) => {
            const [removed] = sourceSection.items.splice(index, 1);
            return removed;
          })
          .reverse();

        targetSection.items.splice(event.currentIndex, 0, ...itemsToMove);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

    this.draggedItems = [];
    this.sections.forEach((section: Section) => {
      section.items.forEach((item: ProjectItem) => (item.checked = false));
      section.selectAllChecked = false;
    });
    this.isAnyCheckboxSelected = false;
    this.updateItemStates();
  }

  onDragStarted(event: any, item: ProjectItem) {
    const section = this.sections.find((s: Section) => s.items.includes(item));
    if (!section) return;

    if (item.checked) {
      this.draggedItems = section.items.filter((i: ProjectItem) => i.checked);
    } else {
      this.draggedItems = [];
    }
  }

  updateItemStates(): void {
    this.sections.forEach(
      (section: { items: { disableUp: boolean; disableDown: boolean }[] }) => {
        section.items.forEach(
          (
            item: { disableUp: boolean; disableDown: boolean },
            index: number
          ) => {
            item.disableUp = index === 0;
            item.disableDown = index === section.items.length - 1;
          }
        );
      }
    );
  }

  onSelect(item: { id: string; name: string }) {
    this.selectedProject = item;
    this.projectLoadError = null;
    this.router.navigate(['/arrange'], {
      queryParams: { projectId: item.id },
    });
  }
}
