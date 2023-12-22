import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {   

  private apiUrl = 'http://localhost:8080'; 
  constructor(private http:HttpClient) { }

  registerUser(userData: any):Observable<any>
  { 
    const url =`${this.apiUrl}/userRegister`
    return this.http.post(url,userData);

  }  

  loginUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, userData);
  }
}
