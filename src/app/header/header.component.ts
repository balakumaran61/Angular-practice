import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() showHeader: boolean = true; 
  get userType(): string {
    // Retrieve user type from local storage
    return localStorage.getItem('userType') || 'error';
  }



  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('User Type in ngOnInit:', this.userType);


  }   

  getProfileLink(): string {
   
    switch (this.userType) {
      case 'teacher':
        return '/profile/teacher-profile';
      case 'student':
        return '/profile/student-profile';
      case 'guardian':
        return '/profile/guardian-profile';
      default:
        return '/'; // Default link if userType is not recognized
    }
  }   

  logout(): void {
    // Clear local storage
    localStorage.removeItem('userType');
    localStorage.removeItem('username');

    // Navigate to the login page or any other page after logout
    this.router.navigate(['/auth/login']);
  }

}
