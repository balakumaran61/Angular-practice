import { Injectable } from '@angular/core';  
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {  
  private apiUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }   

  getTeachers(page: number, size: number, sortBy: string, sortType: string, search: string): Observable<any> {
    const endpoint = `${this.apiUrl}/teacher-pagination`; // Update with your teacher endpoint
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortType', sortType)
      .set('search', search);

    return this.http.get(endpoint, { params });
  }   

 // Modify your service method like this
updateTeacher(username: string, updatedTeacher: any): Observable<any> {
  const url = `${this.apiUrl}/update-teacher/${username}`;
  return this.http.put(url, updatedTeacher, { responseType: 'text' });
}   
getTeacherProfile(username: string): Observable<any> {
  const url = `${this.apiUrl}/teacher-profile/${username}`;
  return this.http.get(url);
}

}
