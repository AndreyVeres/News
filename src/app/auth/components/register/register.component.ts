
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { passwordMatchValidator } from 'src/app/auth/validators/passwordValidator';
import { IUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/auth.service';
const { required, minLength, email } = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnDestroy {
  isExistingUser = {} as IUser
  private subs = new Subscription()
  loginForm = new FormGroup({
    username: new FormControl('', [required, minLength(5)]),
    password: new FormControl('', [required, minLength(5)]),
    confirmPassword: new FormControl('', [required, minLength(5)]),
    email: new FormControl('', [required, email]),
  }, { validators: passwordMatchValidator })

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }


  registerHandler = (): void => {
    const { username, password, email } = this.loginForm.value;
    if (!username || !password || !email) return;
    const newUser = { username, password, email }
    this.authService.checkUser(newUser)
      .subscribe((user) => {
        if (user) {
          this.isExistingUser = user
        } else {
          this.subs.add(
            this.authService.register(newUser).subscribe(() => {
              this.loginForm.reset()
            })
          )
        }
      })
  }

  get username() { return this.loginForm.get('username') }
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  get confirmPassword() { return this.loginForm.get('confirmPassword') }
}
