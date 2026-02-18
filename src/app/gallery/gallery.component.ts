import { Component, OnInit } from '@angular/core';
import { StrapiService, Galerie } from '../services/strapi.service';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  photos: Galerie[] = [];

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getGalerie().subscribe(data => this.photos = data);
  }
}
