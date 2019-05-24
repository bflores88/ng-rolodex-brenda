import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }

  register(data) {
    return this.http.post('/api/register', data).toPromise();
  }

  login(data) {
    return this.http.post('/api/login', data).toPromise();
  }

  logout() {
    return this.http.get('/api/logout').toPromise();
  }

  getContacts(userID): Promise<object> {
    return this.http.get(`/api/contacts/?user=${userID}`).toPromise();
  };

  postContact(name: string, address: string, email: string, mobile: string, work: string, home: string, twitter: string, instagram: string, github: string, created_by: number): Promise<object> {
    const newContact = { name, address, email, mobile, work, home, twitter, instagram, github, created_by }
    return this.http.post('/api/contacts', newContact).toPromise();
  };

  deleteContact(id): Promise<object> {
    return this.http.delete(`/api/contacts/${id}`).toPromise()
  }
  
  getContactSearch(term): Promise<object> {
    return this.http.get(`/api/contacts/search/${term}`).toPromise()
  };
}