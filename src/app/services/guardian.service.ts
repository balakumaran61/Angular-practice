// src/app/services/guardian.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardianService {
  private apiUrl = 'http://localhost:8080'; // Common base URL

  constructor(private http: HttpClient) {}

  getGuardians(page: number, size: number, sortBy: string, sortType: string): Observable<any> {
    const endpoint = `${this.apiUrl}/guardian-pagination`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortType', sortType);

    return this.http.get(endpoint, { params });
  }
}
