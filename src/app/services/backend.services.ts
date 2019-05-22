import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }

  getContacts(): Promise<object> {
    return this.http.get('/api/contacts').toPromise();
  }
  
  getContactSearch(term): Promise<object> {
    console.log(term);
    return this.http.get(`/api/contacts/search/${term}`).toPromise()
  }
}