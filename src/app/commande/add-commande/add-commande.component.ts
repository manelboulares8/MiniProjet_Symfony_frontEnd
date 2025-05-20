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
  styleUrls: ['./add-commande.component.css']  // <-- correction ici
})
export class AddCommandeComponent implements OnInit {
  commande: Commande = {
    id: 0,  // à 0 car nouveau
    quantite: 1,
    articleId: 0,
    dateCommande: new Date().toISOString().slice(0, 10), // date du jour format 'YYYY-MM-DD'
    status: 'en cours',
    total: 0,
    // clientId retiré car géré côté session backend
  };
  successMessage = '';
  selectedArticle: Article | null = null;
  articles: Article[] = [];

  constructor(
    private commandeService: CommandeService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      (data: Article[]) => {
        this.articles = data;
        this.updateTotal(); // calcule total si article sélectionné
      },
      (error) => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }

  /*onSubmit(): void {
    this.updateTotal(); // recalculer total avant envoi

    this.commandeService.addCommande(this.commande).subscribe(
      (response: any) => {
        const total = response.total || this.commande.total;
        this.successMessage = `✅ Commande ajoutée avec succès ! Total à payer: ${total} DT`;
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
*/
onSubmit(): void {
  this.updateTotal();
  
  // Préparer les données dans le format attendu par l'API Symfony
  const commandeData = {
    quantite: this.commande.quantite,
    article: this.commande.articleId, // Note: 'article' au lieu de 'articleId'
    status: this.commande.status,
    // dateCommande et total seront gérés côté serveur
  };

  this.commandeService.addCommande(commandeData).subscribe(
    (response: any) => {
      const total = response.total || this.commande.total;
      this.successMessage = `✅ Commande ajoutée avec succès ! Total à payer: ${total} DT`;
      setTimeout(() => {
        this.router.navigate(['/commande']);
      }, 2000);
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de la commande', error);
      if (error.error && error.error.error) {
        this.successMessage = `❌ Erreur: ${error.error.error}`;
      } else {
        this.successMessage = '❌ Une erreur est survenue';
      }
    }
  );
}
  calculateTotal(): number {
    const article = this.articles.find(a => a.id === this.commande.articleId);
    if (article && this.commande.quantite > 0) {
      return article.prix * this.commande.quantite;
    }
    return 0;
  }

  updateTotal(): void {
    this.selectedArticle = this.articles.find(a => a.id === this.commande.articleId) || null;
    if (this.selectedArticle && this.commande.quantite > 0) {
      this.commande.total = this.selectedArticle.prix * this.commande.quantite;
    } else {
      this.commande.total = 0;
    }
  }
}
