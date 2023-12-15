import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {  
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }     
  
  getStudentDetails(): Observable<any[]> {
    const url = `${this.apiUrl}/studentDetail`;
    return this.http.get<any[]>(url);
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
