import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { GuardianService } from '../services/guardian.service'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-guardian',
  templateUrl: './add-guardian.component.html',
  styleUrls: ['./add-guardian.component.css']
})
export class AddGuardianComponent implements OnInit {  

  newGuardianForm !: FormGroup;

  constructor(private fb: FormBuilder,  private guardianService: GuardianService, private router: Router) { }

  ngOnInit(): void {
    this.newGuardianForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required]],
      username: ['', [Validators.required]],
      studentRollno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{7,8}$/)]]
    });
  }     
  addGuardian() {
    if (this.newGuardianForm.valid) {
      const guardianData = this.newGuardianForm.value;
  
      this.guardianService.addGuardian(guardianData).subscribe(
        () => {
          // Display success alert
          alert('Guardian added successfully');
  
          // Reset the form after successful submission
          this.newGuardianForm.reset();
  
          // Navigate to GuardianComponent
          this.navigateToGuardianComponent();
        },
        (error) => {
          // Log the full error details to the console
          console.error('Error adding guardian:', error);
  
          // Display a generic error alert
          alert('Error adding guardian. Please check the console for details.');
        }
      );
    }
  }
  
  
  
  
  private navigateToGuardianComponent() {
    // Navigate to GuardianComponent
    this.router.navigate(['/guardian']);
  }
  

}
