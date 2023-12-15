import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component'; // Update this line
import { StudentProfileComponent } from './student-profile/student-profile.component';
const routes: Routes = [
  { path: 'student-details', component: StudentDetailsComponent },
  { path: 'student-profile/:rollno', component: StudentProfileComponent },
  // Add other student module routes here
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],

})
export class StudentRoutingModule { }
