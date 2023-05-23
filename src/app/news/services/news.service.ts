import { ICommnet } from '../models/news';
import { INews } from '../models/news';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient, private ns: NotificationService) { }

  getAllNews(): Observable<INews[]> {
    return this.http.get<INews[]>('news')
      .pipe(
        delay(222)
      )
  }

  getNewsById(id: number): Observable<INews> {
    return this.http.get<INews>(`news/${id}`)
  }

  patchComments(comments: ICommnet[], newsId: number): Observable<INews> {
    return this.http.patch<INews>(`news/${newsId}`, {
      comments
    })
  }

  createNews(news: INews) {
    return this.http.post<INews>('news', news).pipe(
      tap((news) => {
        if (news) {
          this.ns.notifySuccess('News was created')
        }
      })
    )
  }

}
