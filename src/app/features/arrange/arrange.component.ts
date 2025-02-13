import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hec-arrange',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './arrange.component.html',
  styleUrl: './arrange.component.scss'
})
export class ArrangeComponent{
  private router = inject(Router);
  private apiService = inject(ApiService);


  projects: any[] = [];
  showModal: boolean = false;

  getProjectList() {
    this.apiService.getProjectList().subscribe({
      next: (response) => {
        const responseBody = JSON.parse(response.body);
        this.projects = responseBody?.project || []; 
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  openModal() {
    this.showModal = true;
    this.getProjectList();
  }

  closeModal() {
    this.showModal = false;
  }

  onClick() {
    this.router.navigate(['arrange-toc']);
  }
}
