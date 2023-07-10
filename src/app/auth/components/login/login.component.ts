import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnDestroy {
  private subs = new Subscription()
  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  loginHandler() {
    const { username, password } = this.loginForm.value
    if (!username || !password) return
    this.subs.add(
      this.authService.login({ username, password })
        .subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
