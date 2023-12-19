// src/app/components/guardian/guardian.component.ts
import { Component, OnInit } from '@angular/core';
import { GuardianService } from '../services/guardian.service';
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


  constructor(private guardianService: GuardianService) {}

  ngOnInit(): void {
    this.loadGuardians();
    this.formModal=new window.bootstrap.Modal(
     document.getElementById("exampleModal")
    );
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
          this.closeModal();
          this.loadGuardians();

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

/*
 fetchStudentDetails(page: number, size: number): void {
    this.studentService.getStudentDetails(page, size).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.students = data.content;
        this.totalPages = data.totalPages;
      },
      (error) => {  
      
        console.error('Error fetching student details:', error);
      }
    );
  }
*/

}
