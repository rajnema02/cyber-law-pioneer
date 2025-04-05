import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoreApiService {
  constructor(private http: HttpClient) {}

  // ✅ Get all with query
  get(apiRoute: String, query: any): Observable<any> {
    return this.http.get(`${environment.url}/${apiRoute}`, { params: query });
  }

  // ✅ Get count with query
  count(apiRoute: String, query: any): Observable<any> {
    return this.http.get(`${environment.url}/${apiRoute}/count`, {
      params: query,
    });
  }

  // ✅ Get item by ID
  getById(apiRoute: String, id: any): Observable<any> {
    return this.http.get(`${environment.url}/${apiRoute}/${id}`);
  }

  // ✅ Create item
  post(apiRoute: String, data: any): Observable<any> {
    return this.http.post(`${environment.url}/${apiRoute}`, data);
  }

  // ✅ Update item by ID
  put(apiRoute: string, id: any, data: any): Observable<any> {
    return this.http.put(`${environment.url}/${apiRoute}/${id}`, data);
  }

  // ✅ Delete item by ID
  delete(apiRoute: String, id: any): Observable<any> {
    return this.http.delete(`${environment.url}/${apiRoute}/${id}`);
  }

  // ✅ Allot batch
  allotBatch(apiRoute: String, id: any, data: any): Observable<any> {
    return this.http.put(`${environment.url}/${apiRoute}/${id}`, data);
  }

  // ✅ Remove from batch
  removeBatch(apiRoute: String, id: any, data: any): Observable<any> {
    return this.http.put(`${environment.url}/${apiRoute}/${id}`, data);
  }

  // ✅ Get sub-resources with query
  getsub(apiRoute: String, query: any): Observable<any> {
    return this.http.get(`${environment.url}/${apiRoute}/sub`, {
      params: query,
    });
  }
}
