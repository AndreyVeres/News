import { Subscription, BehaviorSubject } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models/user';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: IUser
  subs = new Subscription()
  constructor(private route: ActivatedRoute, private ns: NotificationService) { }

  openEditWindow() {
    this.ns.showModal()
  }

  ngOnInit(): void {
    this.subs.add(
      this.route.data.subscribe((data) => this.user = data['user'])
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
