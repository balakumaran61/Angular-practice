import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData = {
    username: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    // Your login logic here
    this.authService.loginUser(this.userData).subscribe(
      (response) => {
        console.log('Login successful:', response);
        alert("successfully signed in");   

        localStorage.setItem('userType', response.userType);
        localStorage.setItem('username', response.username);
        localStorage.setItem('token', response.token);
   
        this.router.navigate(['/home']);
      },
      (error) => {
        alert("error in  signing in");
        console.error('Login error:', error);

      }
    );
  }

}
