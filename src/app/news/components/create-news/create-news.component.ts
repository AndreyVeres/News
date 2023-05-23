import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NewsService } from 'src/app/news/services/news.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})

export class CreateNewsComponent implements OnDestroy {
  subs = new Subscription()
  createNewsForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl('')
  })

  constructor(
    private newsService: NewsService,
    private profileService: ProfileService,
  ) { }



  createNewsHandler() {
    const { title, description, tags } = this.createNewsForm.value
    if (!title || !description || !tags) return
    const newNews = {
      title,
      description,
      categories: tags?.split(' ') || [],
      createdDate: new Date().toString(),
      likes: 0,
      comments: [],
      author: {
        username: this.profileService?.user.value?.username!,
        avatar: this.profileService?.user.value?.avatar
      }
    }

    this.subs.add(
      this.newsService.createNews(newNews).subscribe(() => {
        this.createNewsForm.reset()
      })
    )
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
