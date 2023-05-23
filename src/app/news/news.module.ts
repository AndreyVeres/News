import { ExtractCategoriesPipe } from './pipes/extractCategories';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { NewsComponent } from './components/news/news.component';
import { FilterNewsPipe } from './pipes/filter-news.pipe';

@NgModule({
  declarations: [
    NewsComponent,
    NewsItemComponent,
    NewsDetailsComponent,
    FilterComponent,
    FilterNewsPipe,
    CreateNewsComponent,
    ExtractCategoriesPipe,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NewsRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class NewsModule { }
