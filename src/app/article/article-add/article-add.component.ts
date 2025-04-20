import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-add',
  standalone: false ,// Assurez-vous de ne pas avoir `standalone: true` ici

  templateUrl: './article-add.component.html',
  styleUrl: './article-add.component.css'
})
export class ArticleAddComponent {
  article = {
    nom: '',
    prix: 0,
    stock: 0,
    description: ''
  };

  constructor(private http: HttpClient, private router: Router,    private articleService: ArticleService,
  ) {}

  ajouterArticle() {
    this.articleService.addArticle(this.article).subscribe({
  
      next: (data) => {
        console.log('Article ajouté', data);
        alert('✅ Article ajouté avec succès');
        this.router.navigate(['/lister-articles']);
      },
      error: () => alert('❌ Erreur lors de l\'ajout')
    });
  }
  
}
