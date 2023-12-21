import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {   

  userData = {
    username: '',
    password: '',
    name: '',
    email: '',
    repeatPassword: '',
    userType: 'teacher'
  };
  
  passwordsDoNotMatch = false;
  constructor(private authService:AuthService , private router: Router) { }

  ngOnInit(): void {
  }  

  registerUser(): void {
    if (this.userData.password !== this.userData.repeatPassword) {
      this.passwordsDoNotMatch = true;
      setTimeout(() => {
        this.passwordsDoNotMatch = false;
      }, 1000);
    
    }   
    else{
    this.authService.registerUser(this.userData).subscribe(
      response => {
        console.log('User registration successful:', response);

        alert('Registration successful! Please proceed to login.');
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.error('Error during registration:', error);

        alert('Registration failed. Please try again.');
      }
    );   
    }
  }

}
