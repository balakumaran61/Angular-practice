import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable , throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {  
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }     
  
 // student.service.ts
 getStudentDetails(page: number, size: number): Observable<{ content: any[], totalPages: number }> {
  const url = `${this.apiUrl}/student-pagination?page=${page}&size=${size}`;
  return this.http.get<any>(url).pipe(
    map((response) => ({
      content: response.content, // Extract the 'content' property
      totalPages: response.totalPages // Extract the 'totalPages' property
    }))
  );
}
    

  getStudentByRollNo(rollno: string): Observable<any> {
    const url = `${this.apiUrl}/studentNameAndRollno/${rollno}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching student information:', error);
        throw error; // Rethrow the error for further handling
      })
    );
  }   

  updateStudent(rollno: string, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/updateStudent/${rollno}`;
    return this.http.put(url, updatedData);
  }
  
}
