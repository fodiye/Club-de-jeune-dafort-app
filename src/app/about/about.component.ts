import { Component, OnInit } from '@angular/core';
import { StrapiService, APropos } from '../services/strapi.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  about: APropos | null = null;

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getAPropos().subscribe(data => this.about = data);
  }
}
