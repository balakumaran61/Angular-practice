import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FormsModule } from '@angular/forms'; 


const routes: Routes = [
  { path: 'details', component: StudentDetailsComponent },
  // Add more routes if needed
];

@NgModule({
  declarations: [
    StudentDetailsComponent,
    StudentProfileComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,  
    FormsModule,


  ]
})
export class StudentModule { }
