import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from './directives/focus.directive';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { ToogleDirective } from './directives/toggle.directive';
import { NotifyComponent } from './components/notify/notify.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    FocusDirective,
    ToogleDirective,
    NotifyComponent,
    GlobalErrorComponent,
    SpinnerComponent,
    ModalComponent,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    FocusDirective,
    ToogleDirective,
    NotifyComponent,
    GlobalErrorComponent,
    SpinnerComponent,
    ModalComponent
  ]
})
export class SharedModule { }
