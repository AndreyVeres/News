
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, EMPTY, tap, delay } from 'rxjs';
import { Injectable } from '@angular/core';

import { IUser } from '../core/models/user';
import { AuthService } from '../core/auth.service';
import { ProfileService } from './services/profile.service';
import { NotificationService } from '../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUser> {
  constructor(private profileService: ProfileService, private router: Router, private ns: NotificationService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    this.ns.showSpinner()
    const id = route.params?.['id']

    return this.profileService.getUserById(id).pipe(

      delay(333),
      catchError(() => {

        this.router.navigate(['profile', this.profileService.user.value?.id])
        return EMPTY
      }),
      tap(() => this.ns.hideSpinner()),
    )
  }
}
