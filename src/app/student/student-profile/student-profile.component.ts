import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {  
  rollno: string | null = null;
  student: any = {};
  constructor(private route: ActivatedRoute,
     private studentService: StudentService, 
    private router: Router,
 
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rollno = params.get('rollno');
      // Fetch and display data based on rollno  
      this.fetchStudentInfo();
    });
  }      

  fetchStudentInfo() {
    if (this.rollno) {
      this.studentService.getStudentByRollNo(this.rollno).subscribe(
        (data) => {
          this.student = data;
        },
        (error) => {
          console.error('Error fetching student information:', error);
        }
      );
    }
  }   

  updateStudent() {
    // Assuming you have a form with updated data in this.student
    this.studentService.updateStudent(this.student.rollno, this.student).subscribe(
      () => {
        console.log('Student updated successfully');
         
        alert('Student updated successfully');
        // Optionally, navigate back to the student details component
        this.router.navigate(['/students/student-details']);
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }

  cancelUpdate() {
    // Implement the logic to cancel the update
    console.log('Cancel button clicked');
    this.router.navigate(['/student-details']);
  }  
  

}
