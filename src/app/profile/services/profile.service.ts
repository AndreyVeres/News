import { ISubscription, IUser } from '../../core/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, tap } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user = new BehaviorSubject<IUser | null>(null);
  constructor(private http: HttpClient, private ns: NotificationService) { }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`)
  }

  getSubscriptions(): Observable<ISubscription[]> {
    return this.http.get<ISubscription[]>('subscriptions')
  }

  applyUserChange(newUserValues: IUser) {
    return this.http.patch<IUser>(`users/${this.user.value?.id}`,  newUserValues ).subscribe(user => this.user.next(user))
  }

  changeSubscription(subscription: string) {
    return this.http.patch<IUser>(`users/${this.user.value?.id}`, { subscription })
      .pipe(
        delay(222),
        tap((user) => {
          this.user.next(user)
          this.ns.notifySuccess('subscription changed')
        })
      )
  }
}
