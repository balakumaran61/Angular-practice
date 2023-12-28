import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TeacherDetailComponent
  ],
  imports: [
    CommonModule, 
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule


  ]
})
export class TeacherModule { }
