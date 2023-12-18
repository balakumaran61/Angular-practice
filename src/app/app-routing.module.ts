import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { GuardianComponent } from './guardian/guardian.component';
const routes: Routes = [

    {  path: 'students', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
    { path: 'course', component: CourseComponent },
    { path: '', component: HomeComponent },
    { path:'guardian', component: GuardianComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
