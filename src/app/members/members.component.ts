import { Component, OnInit } from '@angular/core';
import { StrapiService, Membre } from '../services/strapi.service';

@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit {
  members: Membre[] = [];

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getMembres().subscribe(data => this.members = data);
  }
}
