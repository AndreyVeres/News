import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent implements OnInit {
  error$: Observable<string>
  constructor(private ns: NotificationService) { }

  ngOnInit(): void {
    this.error$ = this.ns.error$
  }

  clearError() {
    this.ns.clearError()
  }
}
