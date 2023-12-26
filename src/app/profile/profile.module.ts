import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { GuardianProfileComponent } from './guardian-profile/guardian-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    StudentProfileComponent,
    TeacherProfileComponent,
    GuardianProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
