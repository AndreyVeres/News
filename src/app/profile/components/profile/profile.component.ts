import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ISubscription, IUser } from 'src/app/core/models/user';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = new BehaviorSubject<IUser | null>(null)
  subscriptions$: Observable<ISubscription[]>
  constructor(
    private ns: NotificationService,
    private profileService: ProfileService) { }

  openEditWindow() {
    this.ns.showModal()
  }

  ngOnInit(): void {
    this.user$ = this.profileService.user
    this.subscriptions$ = this.profileService.getSubscriptions()
  }

  setActiveSubscription(name: string) {
    this.profileService.changeSubscription(name).subscribe()
  }

}
