import { Component, OnInit } from '@angular/core';
import { StrapiService, Contact } from '../services/strapi.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contact: Contact | null = null;

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getContact().subscribe(data => this.contact = data);
  }

  onSubmit() {
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
  }
}
