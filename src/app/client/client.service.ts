import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { ResponseIClient, CreateIClient, IClient } from './client';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8080/api/client';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getClient(): Observable<ResponseIClient> {
    return this.http.get<ResponseIClient>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createClient(request: any): Observable<CreateIClient> {
    return this.http.post<any>(this.url, request, this.httpOptions);
  }

  getClientId(id: any): Observable<IClient> {
    const _url = `${this.url}/${id}`;
    return this.http.get<IClient>(_url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateClient(id: any, request: any): Observable<IClient> {
    const _url = `${this.url}/${id}`;
    return this.http.put<IClient>(_url, request);
  }

  deleteClient(id: any): Observable<any> {
    const _url = `${this.url}/${id}`;
    return this.http.delete(_url);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = 'An error ocurred: ${err.error.message}';
    } else {
        errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
