
import { Component, Input } from '@angular/core';
import { INews } from 'src/app/news/models/news';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input() news: INews;
  constructor() { }
}
