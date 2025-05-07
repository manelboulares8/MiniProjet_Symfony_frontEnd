import { Component, NgModule, OnInit } from '@angular/core';
import { Article, ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  standalone: false // Assurez-vous de ne pas avoir `standalone: true` ici

})

export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  searchText: string = '';

  constructor(private articleService: ArticleService,private router: Router) {}

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
  passerCommande(articleId: number): void {
    this.router.navigate(['/add-commande'],{ queryParams: { articleId } });
  }
  filteredArticles(): any[] {
    return this.articles.filter(article =>
      !this.searchText || article.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  
  totalPages(): number[] {
    const total = this.filteredArticles().length;
    const pages = Math.ceil(total / this.itemsPerPage);
    return Array(pages).fill(0).map((_, i) => i + 1);
  }
  paginatedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredArticles().slice(startIndex, endIndex);
  }
}
