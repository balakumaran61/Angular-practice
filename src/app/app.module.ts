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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CourseComponent,
    GuardianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    StudentModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
