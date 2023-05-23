import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewsComponent } from './components/create-news/create-news.component';

import { NewsResolver } from './resolvers/news.resolver';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsComponent } from './components/news/news.component';
import { AuthGuard } from '../core/guards/auth.guard';




const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent, resolve: { data: NewsResolver } },
  { path: 'create', component: CreateNewsComponent, canActivate: [AuthGuard] }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
