import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IResponseProduct, ICreateProduct, IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api/product';
  private urlPagination = '';
 /*
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };
*/
  constructor(private http: HttpClient) { }

  getProduct(page?: number, size?: number): Observable<IResponseProduct> {
    if ((page && size) != null) {
      this.urlPagination = `${this.url}?page=${page}&size=${size}`;
    } else {
      this.urlPagination = this.url;
    }
    return this.http.get<IResponseProduct>(this.urlPagination).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createProduct(request: any): Observable<ICreateProduct> {
    return this.http.post<any>(this.url, request).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductId(id: any): Observable<IProduct> {
    const _url = `${this.url}/${id}`;
    return this.http.get<IProduct>(_url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateProduct(id: any, request: any): Observable<IProduct> {
    const _url = `${this.url}/${id}`;
    return this.http.put<IProduct>(_url, request).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: any): Observable<any> {
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
