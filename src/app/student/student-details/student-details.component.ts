import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
declare var window:any;



@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})  

export class StudentDetailsComponent implements OnInit  
 {   
  students: any[] = [];  
  studentForm !: FormGroup; 
   // Reactive form for student input
  newStudentForm!: FormGroup;
  currentPage = 0;
  pageSize = 10;
  totalPages=0; 
  formModal:any;  

  selectedPageSize: number = 10;    
  selectedColumn: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';   

  get userType(): string {
    return localStorage.getItem('userType') || 'error';
  }
  addStudentModalOpen = false;     
  searchString: string = '';





  

  constructor(private studentService: StudentService,private router: Router,private fb: FormBuilder) { }  
  ngOnInit(): void {   
    this.fetchStudentDetails(this.currentPage);
    this.formModal = new window.bootstrap.Modal(document.getElementById("addStudentModal")); 
    this.newStudentForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
      email: ['', [Validators.required, Validators.email]],
      rollno: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{7,8}$/),
          Validators.minLength(7),
          Validators.maxLength(8),
        ],
      ],
    });
  }
  
  search(): void {
    this.currentPage = 0;
    this.fetchStudentDetails(this.currentPage);
  }
  
  onPageSizeChange(): void {
    // Reset to the first page when page size changes
    this.currentPage = 0;
    this.fetchStudentDetails(this.currentPage);
  }
  
  fetchStudentDetails(page: number): void {
    this.studentService.getStudentDetails(page, this.selectedPageSize, this.searchString).subscribe(
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
  
  editStudentProfile(student: any) {
    // Pass the student's rollno to the profile component
    this.router.navigate(['/students/student-profile', student.rollno]);
  }
  
  changePage(page: number): void {
    this.currentPage = page; 
    this.fetchStudentDetails(this.currentPage);
  }     
  
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchStudentDetails(this.currentPage);
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchStudentDetails(this.currentPage);
    }
  }
  

sortColumn(column: string, order: 'asc' | 'desc'): void {
  // Toggle sort order if the same column is clicked
  if (column === this.selectedColumn) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    // Default to ascending order for a new column
    this.sortOrder = 'asc';
  }

  this.selectedColumn = column;
  this.sortRows(column, this.sortOrder);
}

// ...


  private sortRows(column: string, order: 'asc' | 'desc'): void {
    // Create a copy of the students array to avoid modifying the original data directly
    const sortedStudents = [...this.students];

    // Use JavaScript's array sort method
    sortedStudents.sort((a, b) => {
      // Adjust this logic based on the data type of the column (e.g., string, number)
      if (a[column] < b[column]) {
        return order === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    // Update the students array with the sorted data
    this.students = sortedStudents;
  }  
  openAddStudentModal() {
    this.formModal.show()
  }      
  
  closeAddStudentModal() {
    this.formModal.hide();
    this.newStudentForm.reset();


 
  }  


 addStudent() {   

  if (this.newStudentForm.invalid) {
    alert('Please fill in all required fields with valid data.');
    return;
  }
  const studentData = this.newStudentForm.value;
  this.studentService.addStudent(studentData).subscribe(
    (response) => {
      console.log('Student added successfully:', response);
      alert('Student saved successfully');
      this.closeAddStudentModal();
    },
    (error) => {
      console.error('Error adding student:', error);

      if (error && error.error === 'Rollno already exists') {
        alert('Error: A user with the same Rollno already exists');
      } else {
        alert('Error adding student. Please try again later.');
      }
    }
  );
}

  
}
