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
    this.authService.loginUser(this.userData).subscribe(
      (response) => {
        console.log('Login successful:', response);

        if (response.userType && response.userType !== 'error') {
          console.log('Setting localStorage');
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('username', response.username);
          localStorage.setItem('token',response.token)
          this.router.navigate(['/home']);
        } else {
          console.log('Login failed. UserType:', response.userType);
          alert('Login failed. Please check your credentials.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('Error in signing in');
      }
    );
  }

}
