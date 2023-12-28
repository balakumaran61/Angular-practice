// src/app/components/guardian/guardian.component.ts
import { Component, OnInit } from '@angular/core';
import { GuardianService } from '../services/guardian.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgModel } from '@angular/forms';
declare var window:any;

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.css'],
})
export class GuardianComponent implements OnInit {
  guardians: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  sortBy: string = 'name';
  sortType: string = 'asc'; 
  searchText: string = '';
  formModal:any;  
  selectedGuardian: any={ name: '', email: '', phoneNo: '' }; // This property will hold the selected guardian
  studentInfo: any; // Adjust the type based on the actual response structure
  showSuccessAlert = false;
  showErrorAlert = false;    
  formAddGuardianModal:any;
  newGuardianForm!: FormGroup;
  addGuardianModalOpen = false;
  get userType(): string {
    // Retrieve user type from local storage
    return localStorage.getItem('userType') || 'error';
  }

  constructor(private guardianService: GuardianService, private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.loadGuardians();
    this.formModal=new window.bootstrap.Modal(
     document.getElementById("exampleModal")
    );   
    
    this.newGuardianForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required]],
      studentRollno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{7,8}$/)]]
    });
  }

  loadGuardians() {
    this.guardianService
      .getGuardians(this.currentPage, this.pageSize, this.sortBy, this.sortType, this.searchText)
      .subscribe((data) => {
        this.guardians = data.content;
        this.totalPages = data.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGuardians();
  }

  sort(column: string, type: string) {
    this.sortBy = column;
    this.sortType = type;
    this.loadGuardians();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }   
  onSearchChange() {
    this.loadGuardians();
  }   
   openModal(guardian: any)
   {      
    this.selectedGuardian =  { ...guardian }; 
    this.formModal.show();
    console.log('email' ,this.selectedGuardian.email);
    this.fetchStudentdetail(this.selectedGuardian.email);  

   }    

   closeModal()
   {
    this.formModal.hide();
   }   


   saveGuardianChanges() {
    // Call the service to update the guardian
    this.guardianService.updateGuardian(this.selectedGuardian.email, this.selectedGuardian)
      .subscribe(
        () => {
          console.log('Guardian updated successfully!');
          this.showSuccessAlert = true;
          this.showErrorAlert = false;

          // Automatically hide the alert after 5 seconds (adjust as needed)
          setTimeout(() => {
            this.showSuccessAlert = false;
            this.closeModal();
            this.loadGuardians();
  
          }, 1000);
       
        },
        (error) => {
          console.error('Error updating guardian:', error);
        }
      );
  }    

  fetchStudentdetail(email:string):void
  {
    this.guardianService.getStudentInfoByEmail(email) 
    .subscribe(
      (data) => {  
          this.studentInfo=data;
          console.log('retrived data successfully',data)

      }, 
      (error) =>
      {  
        console.error('error in  gettig information', error);
        
      }
    )
  }   
  navigateToAddGuardian() {
    this.router.navigate(['/addGuardian']);
  }

}
