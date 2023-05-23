import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { IUser } from 'src/app/core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  user: IUser | null
  private subs = new Subscription()
  constructor(public profileService: ProfileService, private authService: AuthService) { }

  logoutHandler() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.subs.add(
      this.profileService.user.subscribe(user => this.user = user)
    )
  }
}
