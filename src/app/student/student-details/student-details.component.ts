import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { Router } from '@angular/router';
import { Content } from '@angular/compiler/src/render3/r3_ast';  


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})  

export class StudentDetailsComponent implements OnInit  
 {   
  students: any[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages=0; 

  selectedPageSize: number = 10;    
  selectedColumn: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';




  

  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void 
  {   
    this.fetchStudentDetails(this.currentPage,this.selectedPageSize);
  }  
  onPageSizeChange(): void {
    // Reset to the first page when page size changes
    this.currentPage = 0;
    this.fetchStudentDetails(this.currentPage, this.selectedPageSize);
  }

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
  editStudentProfile(student: any) {
    // Pass the student's rollno to the profile component
    this.router.navigate(['/students/student-profile', student.rollno]);
  }
  changePage(page: number): void {
    this.currentPage = page; 
    this.fetchStudentDetails(this.currentPage, this.pageSize);
  }     

  nextPage(): void {
    if (this.currentPage < this.totalPages ) {
      this.currentPage++;
      this.fetchStudentDetails(this.currentPage, this.pageSize);
    }
  }

  prevPage(): void {
    if (this.currentPage >= 1) {
      this.currentPage--;
      this.fetchStudentDetails(this.currentPage, this.pageSize);
    }
  }   
  // ...

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

  
  
}
