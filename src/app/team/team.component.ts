import { Component, OnInit } from '@angular/core';
import { StrapiService, Equipe } from '../services/strapi.service';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  members: Equipe[] = [];

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getEquipe().subscribe(data => this.members = data);
  }
}
