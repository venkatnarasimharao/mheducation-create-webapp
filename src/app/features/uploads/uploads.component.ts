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
  initLoader:boolean = false;
  isUploadList:boolean=false;
  isFormShown:boolean=false;
  uploading:boolean=false;
  uploadedList:any=[];
  ngOnInit(): void {
    this.initLoader = true;
    this.fetchUploadList();
  }
 

  constructor(private fb: FormBuilder,private apiService:ApiService) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      displayTitle: ['', Validators.required],
      terms: [false, Validators.requiredTrue], // Must be checked
    });
  }
  supportedFileTypes = [
    { name: 'Adobe PDF', extension: 'PDF' },
    { name: 'Encapsulated PostScript', extension: 'EPS' },
    { name: 'Graphics Interchange Format', extension: 'GIF' },
    { name: 'Hypertext Markup Language', extension: 'HTM, HTML' },
    { name: 'Joint Photographic Experts Group', extension: 'JPG, JPEG' },
    { name: 'Microsoft Excel', extension: 'XLS, XLSX, XLT' },
    { name: 'Microsoft PowerPoint for Windows', extension: 'PPT, PPTX, PPS' },
    { name: 'Microsoft Rich Text Format', extension: 'RTF' },
    { name: 'Microsoft Word', extension: 'DOC, DOCX' },
    { name: 'Microsoft WordPad', extension: 'TXT, TEXT' },
    { name: 'Portable Network Graphics', extension: 'PNG' },
    { name: 'Postscript', extension: 'PS' },
    { name: 'Tagged Image File', extension: 'TIF' }
  ];
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      console.log("Selected File:", file);
  
      this.uploadForm.patchValue({ file }); // Ensure correct assignment
    }
  }
  
  onSubmit() {
    this.uploading = true;
    if (this.uploadForm.valid) {
      console.log('Form Submitted:', this.uploadForm.value);
    } else {
      console.log('Form is invalid');
    }
    const formValue = this.uploadForm.value;
      if (!formValue.file || !(formValue.file instanceof File)) {
      console.error("Error: File is missing or not a valid File object!", formValue.file);
      return;
  }

    const formData = new FormData();
    formData.append('document', formValue.file, formValue.file.name);
     this.apiService.userUpload(formData,this.uploadForm.value).subscribe((data) => {
      
      this.fetchUploadList();
      console.log("Upload successful");
    }
  , (error) => {
    this.uploading = false;
    console.error('Error uploading file:', error);
    this.initLoader = false;
  });
  }
  hasError(field: string, error: string) {
    return this.uploadForm.get(field)?.hasError(error) && this.uploadForm.get(field)?.touched;
  }
 
  uploadNew(){
    this.isFormShown=true;
  }
  fetchUploadList(){
    this.apiService.getUploadedProjectList().subscribe((res)=>{
      this.initLoader = false;
      this.uploading = false;
      this.isFormShown = false;
      const parsedUploadedList = JSON.parse(res.body).result;
      if (!Array.isArray(parsedUploadedList)) {
        this.uploadedList = [parsedUploadedList];
      }else{
        this.uploadedList = parsedUploadedList;
      }
      if(this.uploadedList.length >=1){
        this.isUploadList = true;
      }
      console.log(this.uploadedList);
    },
  (error)=>{
    this.isUploadList = false;
    this.initLoader =false
    this.uploading = false;
   
    console.error('Error fetching uploaded project list:', error);
  });
  }
  show(item: any) {
    console.log(item);
  }
  toggleFavChange(item:any){

  }

}
