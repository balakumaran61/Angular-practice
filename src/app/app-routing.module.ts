import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { GuardianComponent } from './guardian/guardian.component';  
import { AuthModule } from './auth/auth.module';  
import { AddGuardianComponent } from './add-guardian/add-guardian.component';
const routes: Routes = [
    { path: '', redirectTo: 'auth/register', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {  path: 'students', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
    { path: 'course', component: CourseComponent },
    { path: 'home', component: HomeComponent },
    { path:'guardian', component: GuardianComponent},
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }, 
    { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule),
    } ,
    { path: 'addGuardian', component: AddGuardianComponent}
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
