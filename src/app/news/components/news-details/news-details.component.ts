import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { INews } from 'src/app/news/models/news';
import { NewsService } from 'src/app/news/services/news.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { IUser } from 'src/app/core/models/user';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  news: INews
  text: string = '';
  user: IUser | null
  subs = new Subscription();
  form = new FormGroup({ textInput: new FormControl('') })
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private profileService: ProfileService
  ) { }

  addCommentHandler(event?: KeyboardEvent) {
    if (!this.text.trim() || event && event.key !== 'Enter') return
    event?.preventDefault()
    const comments = [
      ...this.news.comments,
      {
        author: {
          username: this.profileService.user.value?.username!,
          avatar: this.profileService.user.value?.avatar
        },
        text: this.text,
        date: Date.now().toString()
      }
    ]

    this.subs.add(
      this.newsService.patchComments(comments, this.news.id!).subscribe(({ comments }) => this.news.comments = comments)
    )
    this.text = ''
  }

  ngOnInit() {
    this.subs.add(
      this.route.data.subscribe((data) => {
        this.news = data['data']
      })
    )

    this.subs.add(
      this.profileService.user.subscribe(user => this.user = user)
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
