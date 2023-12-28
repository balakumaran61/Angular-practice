import { Component, OnInit } from '@angular/core';   
import { TeacherService } from 'src/app/services/teacher.service'; 
import { FormsModule } from '@angular/forms';  
declare var window: any;


@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {   
  teachers: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  sortBy: string = 'name';
  sortType: string = 'asc';
  searchText: string = '';  
  formModal: any;
  selectedTeacher: any = { name: '', age: 0, gender: '', phoneNo: '', email: '', username: '' };  
  showSuccessAlert = false;
  showErrorAlert = false; 


  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {   
    this.loadTeachers();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('teacherModal')
    );
 
    
  }   

  
  loadTeachers() {
    this.teacherService
      .getTeachers(this.currentPage, this.pageSize, this.sortBy, this.sortType, this.searchText)
      .subscribe((data: any) => {
        this.teachers = data.content;
        this.totalPages = data.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTeachers();
  }

  sort(column: string, type: string) {
    this.sortBy = column;
    this.sortType = type;
    this.loadTeachers();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  onSearchChange() {
    this.loadTeachers();
  }   

  openModal(teacher: any) {
    this.selectedTeacher = { ...teacher };
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide();
  }

  saveTeacherChanges() {
    // Call the service to update the teacher
    this.teacherService
      .updateTeacher(this.selectedTeacher.username, this.selectedTeacher)
      .subscribe(
        (response) => {
          console.log(response); // This should be the plain text response
          this.showSuccessAlert = true;
          this.showErrorAlert = false;

          // Automatically hide the alert after 5 seconds (adjust as needed)
          setTimeout(() => {
            this.showSuccessAlert = false;
            this.closeModal();
            this.loadTeachers();
          }, 1000);
        },
        (error) => {
          console.error('Error updating teacher:', error);
        }
      );
  }

}
