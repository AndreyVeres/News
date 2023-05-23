import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { INews } from 'src/app/news/models/news';
import { NewsService } from 'src/app/news/services/news.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news$: Observable<INews[]>;

  searchQuery: string = '';
  activeCategory: string[] = []

  constructor(private newsService: NewsService, private ns: NotificationService) { }

  setCategory = (newCategory: string) => {
    this.activeCategory.includes(newCategory)
      ? this.activeCategory = this.activeCategory.filter(c => c !== newCategory)
      : this.activeCategory = [...this.activeCategory, newCategory]
  }

  setQuery = (newQuery: string) => this.searchQuery = newQuery

  ngOnInit(): void {
    this.ns.showSpinner()
    this.news$ = this.newsService.getAllNews().pipe(tap(() => {
      this.ns.hideSpinner()
    }))
  }
}
