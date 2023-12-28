// src/app/services/guardian.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders ,HttpResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class GuardianService {
  private apiUrl = 'http://localhost:8080'; // Common base URL

  constructor(private http: HttpClient) {}

  getGuardians(page: number, size: number, sortBy: string, sortType: string, search: string): Observable<any> {
    const endpoint = `${this.apiUrl}/guardian-pagination`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortType', sortType)
      .set('search', search);

    return this.http.get(endpoint, { params });
  }   

  updateGuardian(email: string, updatedGuardian: any): Observable<any> {
    const url = `${this.apiUrl}/updateGuardian/${email}`;
    return this.http.put(url, updatedGuardian);
  }   

  getStudentInfoByEmail(email: string): Observable<any>
  {
    const url=`${this.apiUrl}/studentInfoByGuardianEmail/${email}`;
    return this.http.get(url);
    }      
    addGuardian(guardianData: any): Observable<any> {
      const url = `${this.apiUrl}/save-guardian`;
      return this.http.post(url, guardianData, { responseType: 'text' });
    }
    
  }
