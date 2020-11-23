import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResponseICategory } from '../category/category';
import { IResponseProduct, ICreateProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api/product';
  private urlCategory = 'http://localhost:8080/api/category';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProduct(): Observable<IResponseProduct> {
    return this.http.get<IResponseProduct>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createProduct(request: any): Observable<ICreateProduct> {
    return this.http.post<any>(this.url, request, this.httpOptions);
  }

  getCategory(): Observable<ResponseICategory> {
    return this.http.get<ResponseICategory>(this.urlCategory).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
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
