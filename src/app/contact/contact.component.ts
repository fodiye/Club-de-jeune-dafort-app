import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StrapiService, Contact } from '../services/strapi.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contact: Contact | null = null;

  form = {
    nom: '',
    email: '',
    sujet: '',
    message: ''
  };

  sending = false;
  success = false;
  error = false;

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getContact().subscribe(data => this.contact = data);
  }

  onSubmit() {
    this.sending = true;
    this.success = false;
    this.error = false;

    this.strapi.sendMessage(this.form).subscribe({
      next: () => {
        this.sending = false;
        this.success = true;
        this.form = { nom: '', email: '', sujet: '', message: '' };
      },
      error: () => {
        this.sending = false;
        this.error = true;
      }
    });
  }
}
