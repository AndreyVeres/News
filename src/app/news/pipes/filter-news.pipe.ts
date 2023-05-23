import { Pipe, PipeTransform } from '@angular/core';
import { INews } from '../models/news';

@Pipe({
  name: 'filterNews'
})
export class FilterNewsPipe implements PipeTransform {
  transform(news: INews[], searchValue: string, activeCategories: string[]): INews[] {
    // console.log(news);
    // if (searchValue.length === 0) return news


    if (activeCategories.length > 0) {
      return news.filter(n => {
        return n.title.toLowerCase().includes(searchValue.toLowerCase()) && n.categories.some(n => activeCategories.includes(n))
      })
    }
    return news.filter(n => {
      return n.title.toLowerCase().includes(searchValue.toLowerCase())
    })
  }
}
