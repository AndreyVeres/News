import { NewsService } from 'src/app/news/services/news.service';
import { INews } from '../models/news';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, EMPTY, tap, delay } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class NewsResolver implements Resolve<INews> {
  constructor(private newsService: NewsService, private router: Router, private ns: NotificationService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INews> {
    this.ns.showSpinner()
    return this.newsService.getNewsById(route.params?.['id']).pipe(
      delay(333),
      catchError(() => {
        this.router.navigate([''])
        return EMPTY
      }),
      tap(() => this.ns.hideSpinner())
    )
  }
}
