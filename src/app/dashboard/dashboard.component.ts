import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, MembreProfile } from '../auth/auth.service';
import { StrapiService, Cotisation, Transaction } from '../services/strapi.service';
import {
  CarteMembreService,
  CardTheme,
  CARD_THEMES,
} from '../services/carte-membre.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  membre = signal<MembreProfile | null>(null);
  cotisations = signal<Cotisation[]>([]);
  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  activeTab = signal<'carte' | 'cotisations' | 'finances'>('carte');

  themes = CARD_THEMES;
  selectedTheme = signal<CardTheme>(CARD_THEMES[0]);

  currentYear = new Date().getFullYear();

  cotisationsAnnee = computed(() =>
    this.cotisations().filter((c) => c.annee === this.currentYear)
  );

  totalPaye = computed(() =>
    this.cotisationsAnnee()
      .filter((c) => c.statut === 'paye')
      .reduce((sum, c) => sum + c.montant, 0)
  );

  totalEnAttente = computed(() =>
    this.cotisationsAnnee()
      .filter((c) => c.statut === 'en_attente')
      .reduce((sum, c) => sum + c.montant, 0)
  );

  totalRecettes = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'recette')
      .reduce((sum, t) => sum + t.montant, 0)
  );

  totalDepenses = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'depense')
      .reduce((sum, t) => sum + t.montant, 0)
  );

  solde = computed(() => this.totalRecettes() - this.totalDepenses());

  moisPayes = computed(() =>
    this.cotisationsAnnee().filter((c) => c.statut === 'paye').length
  );

  moisLabels = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  constructor(
    private authService: AuthService,
    private strapiService: StrapiService,
    private carteService: CarteMembreService
  ) {}

  ngOnInit(): void {
    this.authService.fetchMembreProfile().subscribe({
      next: (membre) => {
        this.membre.set(membre);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    this.strapiService.getMesCotisations().subscribe({
      next: (data) => this.cotisations.set(data),
    });

    this.strapiService.getTransactions().subscribe({
      next: (data) => this.transactions.set(data),
    });
  }

  setTab(tab: 'carte' | 'cotisations' | 'finances'): void {
    this.activeTab.set(tab);
  }

  selectTheme(theme: CardTheme): void {
    this.selectedTheme.set(theme);
  }

  async downloadCarte(): Promise<void> {
    const m = this.membre();
    if (m) {
      await this.carteService.generateCarte(m, this.selectedTheme());
    }
  }

  getMoisLabel(mois: number): string {
    return this.moisLabels[mois - 1] || '';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  formatMontant(montant: number): string {
    return montant.toLocaleString('fr-FR') + ' FCFA';
  }
}
