import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResponseICategory, ICreateCategory, ICategory } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://localhost:8080/api/category';
  private urlPagination = '';
/*
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
*/
  constructor(private http: HttpClient) { }

  getCategory(page?: number, size?: number): Observable<ResponseICategory> {
    if ((page && size) != null) {
      this.urlPagination = `${this.url}?page=${page}&size=${size}`;
    } else {
      this.urlPagination = this.url;
    }
    return this.http.get<ResponseICategory>(this.urlPagination).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createCategory(request: any): Observable<ICreateCategory> {
    return this.http.post<any>(this.url, request).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCategoryId(id: any): Observable<ICategory> {
    const _url = `${this.url}/${id}`;
    return this.http.get<ICategory>(_url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateCategory(id: any, request: any): Observable<ICategory> {
    const _url = `${this.url}/${id}`;
    return this.http.put<ICategory>(_url, request).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteCategory(id: any): Observable<any> {
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
