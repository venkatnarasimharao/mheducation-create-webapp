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
        console.log(response, 'pricing data in loadprice');
        if (response.ok) {
          const price = JSON.parse(response.body);
          price.assetprices.assetprice.forEach((asset: any) => {
            const assetId = asset?.assetId;
            const priceValue = asset.prices?.price?._value;
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
    const generateMetaData = () => {
      return {
        account: {
          address: {
            city: '',
            country: 'US',
            department: 'null',
            line1: '',
            line2: '',
            school: 'HE non listed',
            state: '',
            zip: '',
          },
          addressType: 'other',
          compType: 'print',
          decisionDate: '30 days or less',
          email: 'karthikins1@mheqa.com',
          enrollment: '20 students or less',
          enrollmentType: 'yearly',
          instructorFirstName: "karthik's",
          instructorLastName: 'Test / Ins 1',
          phone: '',
          previousText: '',
          repFirstName: '',
          repLastName: '',
          repNumber: '',
          shippingAddress: {
            city: 'arizona',
            country: 'US',
            department: '',
            line1: '',
            line2: '',
            school: 'q',
            state: 'AZ',
            zip: '03708',
          },
        },
        bookCover: 'BLUE_ABSTRACT',
        bookFormat: '8by11',
        bookType: 'bw',
        courseNames: {
          course1: 'edited',
          course2: { name: '' },
          course3: { name: '' },
        },
        courseNumbers: {
          course1: { number: '1' },
          course2: { number: '2' },
        },
        coverCreditLine: 'muha04/Getty Images',
        department: 'null',
        discipline: '',
        instructors: {
          instructor1: { firstName: "karthik's", lastName: 'Test / Ins 1' },
          instructor2: { firstName: 'a', lastName: 'q' },
          instructor3: { firstName: '1', lastName: '2' },
          title: 'Professor',
        },
        schools: {
          school1: { name: 'HE non listed' },
          school2: { name: '' },
          school3: { name: '' },
        },
        toc: {
          level1: { style: '' },
          level2: { style: '' },
          level3: { style: '' },
          level4: { style: '' },
          level5: { style: '' },
          suppressNumbers: 'false',
        },
      };
    };
  
    return {
      project: {
        // Static values from original structure
        addRunningHead: "false",
        addToCredits: "false",
        archivedState: "",
        bindingSpec: "Perfect",
        build: "37c722a44d",
        copiedFromGuid: "e6826657-e2a0-019d-8c4d-eddadbd96ac3",
        country: "US",
        createCopyrightPage: "true",
        createCreditPage: "true",
        createDynamicIndex: "true",
        createIndex: "true",
        createTitlePage: "true",
        createToc: "true",
        currency: "USD",
        dateCreated: "Mon, 09 Dec 2024 03:08:56 GMT-05:00",
        eprice: "$0.00",
        guid: this.initialProjectStructure.uid || 'undefined',
        installationId: "",
        isProjectFromOneCompleteBook: "false",
        ldapId: "",
        ldapName: "",
        ldapRmsId: "",
        meta: generateMetaData(),
        pagecount: "20",
        paperSpec: "Regular",
        printindices: "false",
        printprice: "$0.00",
        printpriceColor: "$0.00",
        projectCourseDetails: {
          projectCourseName: "history2",
          projectCourseNumber: {},
          projectInstructorName: "karthik's Test / Ins 1",
          projectSchoolInfo: {
            country: 'US',
            department: 453,
            departmentName: "HISTORY",
            state: 'NY',
            schoolName: 'HE non listed',
            schoolNumber: 'HE non listed',
            schoolPartyId: "",
            zipcode: "",
          },
        },
        projectrevision: "3",
        shrinkWrapped: "false",
        siteId: "1",
        specialInstructions: {},
        sponsorCode: "000164",
        sponsorCodeDeptId: "",
        sponsorCodeId: "1bcc06d5-17fc-43db-90b0-71e2071f54f3",
        status: "DRAFT",
        TOCInfo: { enabled: "true" },
        type: "Project",
        userGroup: "ALL",
        version: "10",
        volumeSplitWarningHasBeenDisplayed: "false",
        structure: {
          entry: this.sections.map((section) => {
            section.items = Array.isArray(section.items) ? section.items : [section.items];
            return {
              type: 'Container',
              subtype: this.getSectionSubtype(section.id),
              entry: section.items.map((item: ProjectItem) => ({
                guid: item.guid || 'undefined',
                computedtitle: item.name || 'undefined',
                price: item.price || 'undefined',
                type: item.type || 'undefined',
                subtype: item.subType || this.getSectionSubtype(section.id),
              })),
            };
          }),
        },
        title: 'createhistory duplicated',
        teachersEditionFormat: "",
        // Any other fields that should maintain the order can be added here...
      },
    };
  }
  

  saveProjectData(): void {
    this.reArrangeProjectOrder = this.createRearrangedProjectOrder();

    console.log('rearrange order', this.reArrangeProjectOrder);
    this.apiService
      .saveProjectData(this.projectId, this.reArrangeProjectOrder)
      .subscribe({
        next: (response) => {
          console.log('Project updated successfully', response);
          this.initialProjectStructure = JSON.parse(
            JSON.stringify(this.reArrangeProjectOrder.project)
          );
        },
        error: (error) => {
          console.error('Error saving project:', error);
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
