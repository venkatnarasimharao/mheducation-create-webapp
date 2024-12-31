import { TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../../shared/components/modal/modal-content/modal-content.component';
import { of } from 'rxjs';
import { ModalService } from './modal-service.service';

describe('ModalService', () => {
  let service: ModalService;
  let modalServiceMock: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    modalServiceMock = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: NgbModal, useValue: modalServiceMock }
      ]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open modal and return a result', async () => {
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['result']);

    // Mocking the component instance and setting the 'data' property
    modalRefMock.componentInstance = { data: {} };

    modalServiceMock.open.and.returnValue(modalRefMock);

    const mockTitle = 'Test Title';
    const mockItems = ['Item 1', 'Item 2'];

    // Setting up the mock result (usually this is a promise)
    modalRefMock.result = Promise.resolve('Test result');

    const result = await service.openModal(mockTitle, mockItems);

    // Checking if open was called with the correct component and passed data
    expect(modalServiceMock.open).toHaveBeenCalledWith(ModalContentComponent);
    expect(modalRefMock.componentInstance.data).toEqual({
      title: mockTitle,
      items: mockItems
    });
    expect(result).toEqual('Test result');
  });

  it('should handle modal rejection', async () => {
    const modalRefMock = jasmine.createSpyObj('NgbModalRef', ['result']);

    // Mocking the component instance and setting the 'data' property
    modalRefMock.componentInstance = { data: {} };

    modalServiceMock.open.and.returnValue(modalRefMock);

    const mockTitle = 'Test Title';
    const mockItems = ['Item 1', 'Item 2'];

    // Setting up the mock result for rejection (using Promise.reject)
    modalRefMock.result = Promise.reject('Test rejection');

    try {
      await service.openModal(mockTitle, mockItems);
      fail('The modal should have rejected');
    } catch (error) {
      expect(error).toEqual('Test rejection');
    }
  });
});
