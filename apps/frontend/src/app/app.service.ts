import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('/api/data');
  }

  postUserData(userdata: any): Observable<any>  {
    return this.http.post('/api/todo/signup', userdata);
  }

  login(userdata: any): Observable<any>  {
    return this.http.post<any>('/api/todo/signin', userdata); 
  } 

  emailExist(userdata: any): Observable<any>  {
    return this.http.post<any>('/api/todo/emailExist', userdata); 
  } 

  
  productcreate(userdata: any): Observable<any>  {
    return this.http.post('/api/todo/productcreate', userdata);
  }

  getproduct(userdata: any): Observable<any>  {
    return this.http.post<any>('/api/todo/getproduct', userdata); 
  } 

  
}
