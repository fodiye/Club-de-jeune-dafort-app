import { Component, OnInit } from '@angular/core';
import { StrapiService, Activite, Contact } from '../services/strapi.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  activities: Activite[] = [];
  contact: Contact | null = null;

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getActivites().subscribe(data => this.activities = data);
    this.strapi.getContact().subscribe(data => this.contact = data);
  }
}
