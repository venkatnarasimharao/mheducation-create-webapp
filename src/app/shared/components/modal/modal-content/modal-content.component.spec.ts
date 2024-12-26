import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalContentComponent } from './modal-content.component';
import { provideRouter } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalContentComponent', () => {
  let component: ModalContentComponent;
  let fixture: ComponentFixture<ModalContentComponent>;
  let mockActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContentComponent],
      providers: [
        provideRouter([]),
        NgbActiveModal  // Add NgbActiveModal to providers
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal);

    // Initialize the @Input data
    component.data = {
      title: 'Test Title',
      items: ['item1', 'item2']
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected item and close modal', () => {
    const testItem = 'test item';
    spyOn(component.itemSelected, 'emit');
    spyOn(mockActiveModal, 'close');

    component.selectItem(testItem);

    expect(component.itemSelected.emit).toHaveBeenCalledWith(testItem);
    expect(mockActiveModal.close).toHaveBeenCalledWith(testItem);
  });
});