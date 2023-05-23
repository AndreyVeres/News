import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_SUBSCRIPTIONS } from '../models/user';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url === 'http://localhost:3000/users') {
      const modifiedBody = {
        ...req.body,
        subscription: USER_SUBSCRIPTIONS.STANDART,
        avatar: '../../../../assets/avatar.svg'
      };

      const modifiedReq = req.clone({
        body: modifiedBody
      });

      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
