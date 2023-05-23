import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, tap, throwError } from 'rxjs';
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
    return this.http.get<IUser[]>('http://localhost:3000/users')
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
        catchError(this.errorHandler.bind(this))
      )
  }

  auth() {
    const userId = localStorage.getItem('user');

    if (userId) {
      this.http.get<IUser>(`http://localhost:3000/users/${userId}`)
        .pipe(
          tap((user) => {
            if (user) {
              this.isAuth = true;
              this.profileService.user.next(user)
            }
          }),
          catchError(this.errorHandler.bind(this))
        ).subscribe(() => {
          this.resolveAuthRequest()
        })
    } else {
      this.resolveAuthRequest()
    }

  }

  checkUser({ username, email }: IUser): Observable<IUser | undefined> {
    return this.http.get<IUser[]>(`http://localhost:3000/users`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((users) => users.find(user => user.username === username || user.email === email)),
      )
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/users', user)
      .pipe(
        catchError(this.errorHandler.bind(this)),
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

  private errorHandler(error: HttpErrorResponse) {
    this.ns.showError(error.message)
    return throwError(() => error.message)
  }

}
