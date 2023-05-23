import { ISubscription, IUser } from '../../core/models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user = new BehaviorSubject<IUser | null>(null);
  constructor(private http: HttpClient, private ns: NotificationService) { }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:3000/users/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  getSubscriptions(): Observable<ISubscription[]> {
    return this.http.get<ISubscription[]>('http://localhost:3000/subscriptions')
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }


  private errorHandler(error: HttpErrorResponse) {
    this.ns.showError(error.message)
    return throwError(() => error.message)
  }

}
