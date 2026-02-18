import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: any;
}

export interface Hero {
  badge: string;
  titre: string;
  sous_titre: string;
  description: string;
  bouton_principal_texte: string;
  bouton_principal_lien: string;
  bouton_secondaire_texte: string;
  bouton_secondaire_lien: string;
}

export interface APropos {
  titre_mission: string;
  texte_mission: string;
  titre_vision: string;
  texte_vision: string;
}

export interface Activite {
  icone: string;
  titre: string;
  description: string;
  couleur: string;
  ordre: number;
}

export interface Galerie {
  icone: string;
  label: string;
  gradient: string;
  taille: 'normal' | 'large';
  ordre: number;
}

export interface Membre {
  nom: string;
  initiales: string;
  role: string;
  description?: string;
  couleur: string;
  ordre: number;
}

export interface Equipe {
  nom: string;
  initiales: string;
  role: string;
  description: string;
  couleur: string;
  ordre: number;
}

export interface Contact {
  adresse: string;
  telephone: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  whatsapp_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  getHero(): Observable<Hero> {
    return this.http.get<StrapiResponse<Hero>>(`${this.apiUrl}/hero`).pipe(
      map(res => res.data)
    );
  }

  getAPropos(): Observable<APropos> {
    return this.http.get<StrapiResponse<APropos>>(`${this.apiUrl}/a-propos`).pipe(
      map(res => res.data)
    );
  }

  getActivites(): Observable<Activite[]> {
    return this.http.get<StrapiCollectionResponse<Activite>>(`${this.apiUrl}/activites?sort=ordre:asc`).pipe(
      map(res => res.data)
    );
  }

  getGalerie(): Observable<Galerie[]> {
    return this.http.get<StrapiCollectionResponse<Galerie>>(`${this.apiUrl}/galeries?sort=ordre:asc`).pipe(
      map(res => res.data)
    );
  }

  getMembres(): Observable<Membre[]> {
    return this.http.get<StrapiCollectionResponse<Membre>>(`${this.apiUrl}/membres?sort=ordre:asc&pagination[pageSize]=100`).pipe(
      map(res => res.data)
    );
  }

  getEquipe(): Observable<Equipe[]> {
    return this.http.get<StrapiCollectionResponse<Equipe>>(`${this.apiUrl}/equipes?sort=ordre:asc`).pipe(
      map(res => res.data)
    );
  }

  getContact(): Observable<Contact> {
    return this.http.get<StrapiResponse<Contact>>(`${this.apiUrl}/contact`).pipe(
      map(res => res.data)
    );
  }
}
