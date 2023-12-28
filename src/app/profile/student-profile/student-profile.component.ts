import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentProfile: any;


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    const rollno = localStorage.getItem('username');
    console.log("rollno", rollno);

    if (rollno) {
      // Make the API request to get student profile
      this.studentService.getStudentProfile(rollno).subscribe(
        (data) => {
          this.studentProfile = data;
          console.log("student data", data);
          
        },
        (error) => {
          console.error('Error fetching student profile:', error);
        }
      );
    } else {
      console.error('Roll number not found in local storage');
      // Handle the case where the roll number is not found
    }
  }

}
