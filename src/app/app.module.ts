import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './student/student.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { GuardianComponent } from './guardian/guardian.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GuardianModalComponent } from './guardian-modal/guardian-modal.component';   
import { ProfileModule } from './profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CourseComponent,
    GuardianComponent,
    GuardianModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    StudentModule,
    HttpClientModule,
    FormsModule,
    ProfileModule,
    BrowserAnimationsModule,
    ReactiveFormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
