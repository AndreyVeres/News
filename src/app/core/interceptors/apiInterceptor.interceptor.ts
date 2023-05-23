import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

const APIURL = 'http://localhost:3000/'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private ns: NotificationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      url: APIURL + req.url
    }))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.ns.showError(error.message)
          return throwError(error)
        })
      )
  }
}
