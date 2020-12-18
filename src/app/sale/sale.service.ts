import { IResponseSale, ICreateSale, ISale } from './sale';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private url = 'http://localhost:8080/api/sale';
/*
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
*/
  constructor(private http: HttpClient) { }

  getSale(): Observable<IResponseSale> {
    return this.http.get<IResponseSale>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createSale(request: any): Observable<ICreateSale> {
    return this.http.post<any>(this.url, request).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getSaleId(id: any): Observable<ISale> {
    const _url = `${this.url}/${id}`;
    return this.http.get<ISale>(_url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateSale(id: any, request: any): Observable<ISale> {
    const _url = `${this.url}/${id}`;
    return this.http.put<ISale>(_url, request).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteSale(id: any): Observable<any> {
    const _url = `${this.url}/${id}`;
    return this.http.delete(_url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
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
