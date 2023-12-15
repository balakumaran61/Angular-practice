import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit  
 {   
  students: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void 
  {   
    this.fetchStudentDetails();
  } 

   fetchStudentDetails(): void 
   {
    this.studentService.getStudentDetails().subscribe(
      (data) => {
        this.students = data;
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

  
}
