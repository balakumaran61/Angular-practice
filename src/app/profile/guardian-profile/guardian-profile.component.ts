import { Component, OnInit } from '@angular/core';
import { GuardianService } from 'src/app/services/guardian.service';

@Component({
  selector: 'app-guardian-profile',
  templateUrl: './guardian-profile.component.html',
  styleUrls: ['./guardian-profile.component.css']
})
export class GuardianProfileComponent implements OnInit {
  guardianProfile: any;
  studentProfile: any;

  constructor(private guardianService: GuardianService) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    console.log("username", username);

    if (username) {
      // Make the API request to get guardian profile
      this.guardianService.getGuardianProfile(username).subscribe(
        (data) => {
          this.guardianProfile = data;
          console.log("guardian data", data);

          // Fetch associated student details
          if (this.guardianProfile && this.guardianProfile.email) {
            this.guardianService.getStudentInfoByEmail(this.guardianProfile.email).subscribe(
              (studentData) => {
                this.studentProfile = studentData;
                console.log("student data", studentData);
              },
              (studentError) => {
                console.error('Error fetching student profile:', studentError);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching guardian profile:', error);
        }
      );
    }
    else {
      console.error('Username not found in local storage');
    }
  }
}
