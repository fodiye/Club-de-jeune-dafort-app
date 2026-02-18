import { Component, OnInit } from '@angular/core';
import { StrapiService, Activite } from '../services/strapi.service';

@Component({
  selector: 'app-activities',
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit {
  activities: Activite[] = [];

  constructor(private strapi: StrapiService) {}

  ngOnInit() {
    this.strapi.getActivites().subscribe(data => this.activities = data);
  }
}
