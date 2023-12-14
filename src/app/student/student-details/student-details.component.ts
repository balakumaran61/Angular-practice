import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 




@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit  
 {   
  students: any[] = [];

  constructor(private studentService: StudentService) { }

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

  
}
