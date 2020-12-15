import { NotificationService } from './../notification.service';
import { AuthService } from 'src/app/login/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private notification: NotificationService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 403) {
                this.authService.logout();
                this.notification.openDialog(
                    0,
                    'Sua seção expirou!',
                    'É necessário fazer login novamente.',
                    false,
                    this,
                    () => {}
                );
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}