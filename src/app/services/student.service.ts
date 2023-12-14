import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {  
  private apiUrl = 'http://localhost:8080/studentDetail';

  constructor(private http: HttpClient) { }     
  
  getStudentDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
