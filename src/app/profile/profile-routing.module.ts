import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';  
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { GuardianProfileComponent } from './guardian-profile/guardian-profile.component';

const routes: Routes = [
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'guardian-profile', component: GuardianProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})    

export class ProfileRoutingModule { }
