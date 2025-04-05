import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionFieService {

  api = 'questionfile';

  constructor(
    private http: HttpClient
  ) { }

  create(data: any) {
    return this.http.post(`${environment.url}/${this.api}/create`, data);
  }
  getList(data: any) {
    return this.http.post(`${environment.url}/${this.api}/getList`, data);
  }



}
