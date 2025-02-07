import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'hec-uploads',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss'
})
export class UploadsComponent implements OnInit {
  uploadForm: FormGroup;
  supportedFileTypes = [
    'PDF', 'EPS', 'GIF', 'HTM', 'HTML', 'JPG', 'JPEG', 'XLS', 'XLSX', 'XLT', 
    'PPT', 'PPTX', 'PPS', 'RTF', 'DOC', 'DOCX', 'TXT', 'TEXT', 'PNG', 'PS', 'TIF'
  ];

  constructor(private fb: FormBuilder,private apiService:ApiService) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      displayTitle: ['', Validators.required],
      terms: [false, Validators.requiredTrue], // Must be checked
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ file });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      console.log('Form Submitted:', this.uploadForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Helper function to check field errors
  hasError(field: string, error: string) {
    return this.uploadForm.get(field)?.hasError(error) && this.uploadForm.get(field)?.touched;
  }
  isUploadLoading:boolean=false;
  uploadedList:any=[];
  ngOnInit(): void {
    this.fetchUploadList();
  }
  fetchUploadList(){
    this.isUploadLoading = true;
    this.apiService.getUploadedProjectList().subscribe((res)=>{
      this.isUploadLoading = false;
      const parsedUploadedList = JSON.parse(res.body).result;
      if (!Array.isArray(parsedUploadedList)) {
        this.uploadedList = [parsedUploadedList];
      }else{
        this.uploadedList = parsedUploadedList;
      }
      console.log(this.uploadedList);
    },
  (error)=>{
    this.isUploadLoading = false;
    console.error('Error fetching uploaded project list:', error);
  });
  }
  show(item: any) {
    console.log(item);
  }
  toggleFavChange(item:any){

  }

}
