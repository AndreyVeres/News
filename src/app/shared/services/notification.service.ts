import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface INotify {
  type: 'error' | 'success',
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notify$ = new BehaviorSubject<INotify | null>(null)
  error$ = new Subject<string>()
  spinner$ = new Subject<boolean>()
  modal$ = new BehaviorSubject<boolean>(false)

  showModal() {
    this.modal$.next(true)
  }

  closeModal() {
    this.modal$.next(false)
  }

  showSpinner() {
    this.spinner$.next(true)
  }

  hideSpinner() {
    this.spinner$.next(false)
  }

  showError(message: string) {
    this.error$.next(message)
  }

  clearError() {
    this.error$.next('')
  }

  notifyError(message: string) {
    this.notify$.next({ type: 'error', message })
    setTimeout(() => {
      this.clearNotify()
    }, 3000);

  }

  notifySuccess(message: string) {
    this.notify$.next({ type: 'success', message })
    setTimeout(() => {
      this.clearNotify()
    }, 3000);
  }

  clearNotify() {
    this.notify$.next(null)
  }
}
