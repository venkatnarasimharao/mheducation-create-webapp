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
        NgbActiveModal
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalContentComponent);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal);

    component.data = {
      title: 'Test Title',
      items: [{ displayValue: "item1" }, { displayValue: "item2" }]
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected item and close the modal', () => {
    const testItem = 'test item';
    spyOn(component.itemSelected, 'emit');
    spyOn(mockActiveModal, 'close');

    component.selectItem(testItem);

    expect(component.itemSelected.emit).toHaveBeenCalledWith(testItem);
    expect(mockActiveModal.close).toHaveBeenCalledWith(testItem);
  });

  it('should display the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('Test Title');
  });

  it('should display the list of items in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('item1');
    expect(listItems[1].textContent).toContain('item2');
  });

  it('should call selectItem when an item is clicked', () => {
    spyOn(component, 'selectItem');
    const compiled = fixture.nativeElement as HTMLElement;
    const firstItem = compiled.querySelector('li');
    firstItem?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.selectItem).toHaveBeenCalledWith({ displayValue: 'item1' });
  });
});
