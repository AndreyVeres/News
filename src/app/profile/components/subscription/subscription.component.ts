import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { ISubscription } from 'src/app/core/models/user';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  subs: Subscription
  subscriptions$: Observable<ISubscription[]>
  constructor(private profileSerive: ProfileService) { }

  ngOnInit(): void {
    this.subscriptions$ = this.profileSerive.getSubscriptions()
  }

}
