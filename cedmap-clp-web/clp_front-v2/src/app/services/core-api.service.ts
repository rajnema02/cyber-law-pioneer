import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { observable, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

import { catchError } from "rxjs/operators";

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

   // ✅ Get item by ID with enhanced error handling
   getById(apiRoute: String, id: any): Observable<any> {
    return this.http.get(`${environment.url}/${apiRoute}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        let errorDetails: any = null;

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorDetails = error.error;
          
          switch (error.status) {
            case 400:
              errorMessage = error.error?.message || 'Invalid request';
              break;
            case 404:
              errorMessage = error.error?.message || 'Resource not found';
              break;
            case 410:
              errorMessage = error.error?.message || 'Resource is inactive';
              break;
            case 500:
              errorMessage = error.error?.message || 'Server error';
              break;
            default:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        return throwError({
          status: error.status,
          message: errorMessage,
          details: errorDetails,
          originalError: process.env.production ? undefined : error
        });
      })
    );
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
