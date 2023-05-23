import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RegistrationInterceptor } from './interceptors/registration.interceptor';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RegistrationInterceptor,
    multi: true
  }],
})
export class CoreModule { }
