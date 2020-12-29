import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { ResponseIClient, CreateIClient, IClient, IResponseLoginClient, IUpdateClient } from './models/client';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8080/api/client';
  private urlLogin = 'http://localhost:8080/api/client/login';
  private urlPagination = '';
/*
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
*/
  constructor(private http: HttpClient) { }

  getClient(page?: number, size?: number): Observable<ResponseIClient> {
    if ((page && size) != null) {
      this.urlPagination = `${this.url}?page=${page}&size=${size}`;
    } else {
      this.urlPagination = this.url;
    }
    return this.http.get<ResponseIClient>(this.urlPagination).pipe(
      tap(data => console.log('All: ' + 'get success')),
      catchError(this.handleError)
    );
  }

  createClient(request: any): Observable<CreateIClient> {
    return this.http.post<any>(this.url, request).pipe(
      tap(data => console.log('All: ' + 'create success')),
      catchError(this.handleError)
    );
  }

  getClientId(id: any): Observable<IClient> {
    const _url = `${this.url}/${id}`;
    return this.http.get<IClient>(_url).pipe(
      tap(data => console.log('All: ' + 'get success')),
      catchError(this.handleError)
    );
  }

  updateClient(request: any): Observable<IUpdateClient> {
    return this.http.put<IClient>(this.url, request).pipe(
      tap(data => console.log('All: ' + 'update success')),
      catchError(this.handleError)
    );
  }

  deleteClient(id: any): Observable<any> {
    const _url = `${this.url}/${id}`;
    return this.http.delete(_url).pipe(
      tap(data => console.log('All: ' + 'delete success')),
      catchError(this.handleError)
    );
  }

  verifyLoginClient(request: any): Observable<IResponseLoginClient> {
    return this.http.post<any>(this.urlLogin, request).pipe(
      tap(data => console.log('All: ' + 'login success')),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
