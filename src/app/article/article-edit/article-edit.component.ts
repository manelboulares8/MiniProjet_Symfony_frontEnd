import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  standalone: false ,// Assurez-vous de ne pas avoir `standalone: true` ici

})
export class ArticleEditComponent implements OnInit {
  article: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
  
    if (id !== null) {
      this.articleService.getArticleById(id).subscribe((data: any) => {
        console.log('Données reçues pour modification :', data);
        this.article = data;
      });
    } else {
      console.error("L'ID est null !");
    }
  }
  

  modifierArticle(): void {
    const id = this.route.snapshot.params['id'];
    this.articleService.updateArticle(id, this.article).subscribe(() => {
      this.router.navigate(['/lister-articles']);
    });
  }
  annulerModification(){
    this.router.navigate(['lister-articles'])
  }
}
