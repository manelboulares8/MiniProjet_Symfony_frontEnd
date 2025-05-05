import { Component } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-search',
  standalone: false,
  templateUrl: './article-search.component.html',
  styleUrl: './article-search.component.css'
})
export class ArticleSearchComponent {
  minPrice!: number;
  maxPrice!: number;
  articles: Article[] = [];

  constructor(private articleService: ArticleService,private route: ActivatedRoute,
    private router: Router,) {}

  search(): void {
    this.articleService.searchArticlesByPrice(this.minPrice, this.maxPrice).subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
      }
    });
  }
  passerCommande(articleId: number): void {
    this.router.navigate(['/add-commande'],{ queryParams: { articleId } });
  }
}
