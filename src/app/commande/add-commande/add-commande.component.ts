import { Component, OnInit } from '@angular/core';
import { Commande } from '../../models/commande.model';
import { Article } from '../../models/article.model';
import { CommandeService } from '../../services/commande.service';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-commande',
  standalone: false,
  templateUrl: './add-commande.component.html',
  styleUrl: './add-commande.component.css'
})
export class AddCommandeComponent implements OnInit {
  commande: Commande = {
    id: 1,
    quantite: 1,
    articleId: 0,
    dateCommande: '2025-04-25',
    status: 'en cours',
    total: 0,
    clientId: 0
  };
  successMessage: string = '';
  selectedArticle: Article | null = null;

  articles: Article[] = [];
  tot: any;
  articleId!: number;
  article: any;
  constructor(
    private commandeService: CommandeService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    
    this.route.queryParams.subscribe(params => {
      const id = +params['articleId'];
      if (id) {
        this.commande.articleId = id;
      }
      this.loadArticles();
    });
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articles = data;
        if (this.commande.articleId) {
          this.selectedArticle = this.articles.find(a => a.id === this.commande.articleId) || null;
          this.updateTotal(); // Calcule le total automatiquement
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }
  onSubmit(): void {
    this.commandeService.addCommande(this.commande).subscribe(
      (response) => {
        const total = response.total;
        this.successMessage = `✅ Commande ajoutée avec succès ! Total à payer: ${total} DT`;
        this.tot=response.total;
        setTimeout(() => {
          this.router.navigate(['/commande']);
        }, 2000);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la commande', error);
        if (error.error && error.error.message) {
          this.successMessage = `❌ Erreur: ${error.error.message}`;
        } else {
          this.successMessage = '❌ Une erreur est survenue';
        }
      }
    );
  }
  
  // Ajoutez cette méthode pour afficher le total estimé
  calculateTotal(): number {
    const article = this.articles.find(a => a.id === this.commande.articleId);
    if (article && this.commande.quantite) {
      return article.prix * this.commande.quantite;
    }
    return 0;
  }
  updateTotal(): void {
    // Trouver l'article sélectionné
    this.selectedArticle = this.articles.find(a => a.id === this.commande.articleId) || null;
    
    // Calculer le total si tout est valide
    if (this.selectedArticle && this.commande.quantite > 0) {
      this.commande.total = this.selectedArticle.prix * this.commande.quantite;
    } else {
      this.commande.total = 0;
    }
  }
}