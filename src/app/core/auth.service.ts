import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { NotificationService } from '../shared/services/notification.service';
import { ProfileService } from '../profile/services/profile.service';
import { IUser, USER_SUBSCRIPTIONS } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false
  resolveAuthRequest: Function = () => { }
  authRequest = new Promise(resolve => this.resolveAuthRequest = resolve)

  constructor(
    private http: HttpClient,
    private router: Router,
    private ns: NotificationService,
    private profileService: ProfileService
  ) { }

  login({ username, password }: Pick<IUser, 'username' | 'password'>): Observable<IUser | void> {
    return this.http.get<IUser[]>('users')
      .pipe(
        map((users) => users.find(user => user.password === password && user.username === username)),
        tap((user) => {
          if (user) {
            this.profileService.user.next(user)
            this.isAuth = true
            this.router.navigate([''])
            this.ns.notifySuccess(`Welcome ${user.username}`)
            localStorage.setItem('user', `${user.id}`)
          } else {
            this.ns.notifyError(`Wrong email or password`)
          }
          this.resolveAuthRequest()
          return user
        }),
      )
  }

  auth() {
    const userId = localStorage.getItem('user');

    if (userId) {
      this.http.get<IUser>(`users/${userId}`)
        .pipe(
          tap((user) => {
            if (user) {
              this.isAuth = true;
              this.profileService.user.next(user)
            }
          })
        ).subscribe(() => {
          this.resolveAuthRequest()
        })
    } else {
      this.resolveAuthRequest()
    }

  }

  checkUser({ username, email }: IUser): Observable<IUser | undefined> {
    return this.http.get<IUser[]>(`users`)
      .pipe(
        map((users) => users.find(user => user.username === username || user.email === email)),
      )
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('users', {
      ...user,
      subscription: USER_SUBSCRIPTIONS.STANDART,
      avatar: '../../../../assets/avatar.svg'
    })
      .pipe(
        tap(() => {
          this.ns.notifySuccess('User was created')
        })
      )
  }

  logout(): void {
    this.profileService.user.next(null)
    this.isAuth = false;
    this.router.navigate(['/auth/sign-in'])
    this.ns.notifySuccess('Logout completed')
    localStorage.removeItem('user')
  }
}
