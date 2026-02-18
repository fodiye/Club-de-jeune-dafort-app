import { Component, OnInit } from '@angular/core';
import { StrapiService, Hero } from '../services/strapi.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  hero: Hero | null = null;

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getHero().subscribe(data => this.hero = data);
  }
}
