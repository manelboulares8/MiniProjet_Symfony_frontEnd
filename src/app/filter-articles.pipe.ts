import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArticles',
  standalone: false // ✅ ou retire complètement `standalone`

})
export class FilterArticlesPipe implements PipeTransform {
  transform(articles: any[], searchText: string): any[] {
    if (!articles) return [];
    if (!searchText) return articles;

    searchText = searchText.toLowerCase();

    return articles.filter(article => {
      return Object.values(article).some(val =>
        val?.toString().toLowerCase().includes(searchText)
      );
    });
  }
}
