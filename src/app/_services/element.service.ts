import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Element } from '../models/element.model';

const baseUrl = 'http://localhost:8080/api/elements';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Element[]> {
    return this.http.get<Element[]>(baseUrl);
  }

  get(id: any): Observable<Element> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Element[]> {
    return this.http.get<Element[]>(`${baseUrl}?title=${title}`);
  }

}
