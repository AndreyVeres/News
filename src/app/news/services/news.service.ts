import { ICommnet } from '../models/news';
import { INews } from '../models/news';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, tap, throwError, EMPTY } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient, private ns: NotificationService) { }

  getAllNews(): Observable<INews[]> {
    return this.http.get<INews[]>('http://localhost:3000/news')
      .pipe(
        delay(222),
        catchError(this.errorHandler.bind(this)),
      )
  }

  getNewsById(id: number): Observable<INews> {
    return this.http.get<INews>(`http://localhost:3000/news/${id}`).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  patchComments(comments: ICommnet[], newsId: number): Observable<INews> {
    return this.http.patch<INews>(`http://localhost:3000/news/${newsId}`, {
      comments
    })
  }

  createNews(news: INews) {
    return this.http.post<INews>('http://localhost:3000/news', news).pipe(
      tap((news) => {
        if (news) {
          this.ns.notifySuccess('News was created')
        }
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.ns.showError(error.message)
    return throwError(() => error.message)
  }
}
