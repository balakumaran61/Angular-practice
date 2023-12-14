import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentRoutingModule } from './student-routing.module';


const routes: Routes = [
  { path: 'details', component: StudentDetailsComponent },
  // Add more routes if needed
];

@NgModule({
  declarations: [
    StudentDetailsComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,   

  ]
})
export class StudentModule { }
