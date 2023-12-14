import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any[] = [];


  constructor(private courseService: CourseService) { }

  ngOnInit(): void { 
    this.fetchCourses();
  }   

  fetchCourses(): void {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        // Add serial number to each course
        this.courses.forEach((course, index) => {
          course.serialNumber = index + 1;
        });
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

}
