import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { UserResolver } from './user.resolver';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'subscriptions', component: SubscriptionComponent, canActivate: [AuthGuard]
  },
  {
    path: ':id', component: ProfileComponent, canActivate: [AuthGuard], resolve: { 'user': UserResolver }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
