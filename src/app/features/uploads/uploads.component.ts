import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-uploads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss'
})
export class UploadsComponent implements OnInit {
  constructor(private apiService:ApiService){}
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
    })
  }
  show(item: any) {
    console.log(item);
  }
  toggleFavChange(item:any){

  }

}
