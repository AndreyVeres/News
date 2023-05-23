import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INotify, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})

export class NotifyComponent implements OnInit {
  notify$: Observable<INotify | null>
  constructor(private ns: NotificationService) { }

  ngOnInit(): void {
    this.notify$ = this.ns.notify$
  }

  closeNotification() {
    this.ns.clearNotify()
  }
}
