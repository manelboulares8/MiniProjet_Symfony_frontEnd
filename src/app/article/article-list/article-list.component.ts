import { Component, NgModule, OnInit } from '@angular/core';
import { Article, ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  standalone: false // Assurez-vous de ne pas avoir `standalone: true` ici

})

export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe({
      next: data => this.articles = data,
      error: err => console.error(err)
    });

    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      console.log(data); // 👀 Vérifie ici
    });
  }
  supprimerArticle(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      }, error => {
        console.error("Erreur lors de la suppression :", error);
      });
    }
  }
  
}
