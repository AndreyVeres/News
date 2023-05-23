import { ISubscription, IUser } from '../../core/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
}
