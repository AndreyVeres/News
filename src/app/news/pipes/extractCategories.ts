import { INews } from '../models/news';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractCategories'
})
export class ExtractCategoriesPipe implements PipeTransform {
  transform(news: INews[]): string[] {
    return Array.from(new Set(news.reduce((acc, n) => acc.concat(n.categories), [] as string[])))
  }
}
