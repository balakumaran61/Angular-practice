import { Component, OnInit } from '@angular/core';  
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  teacherProfile: any;

  constructor(private teacherService :TeacherService) { }

  ngOnInit(): void {   
    const username = localStorage.getItem('username');    
    console.log("username",username);

    if (username) {
      // Make the API request to get teacher profile
      this.teacherService.getTeacherProfile(username).subscribe(
        (data) => {
          this.teacherProfile = data;
          console.log("teacher data", data);
          // Do additional processing if needed
        },
        (error) => {
          console.error('Error fetching teacher profile:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    } 
    else {
      console.error('Username not found in local storage');
      // Handle the case where the username is not found
    }
  }
  

}
