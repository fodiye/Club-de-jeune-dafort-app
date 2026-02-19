import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { TeamComponent } from '../team/team.component';
import { MembersComponent } from '../members/members.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-landing',
  imports: [
    HeroComponent,
    AboutComponent,
    ActivitiesComponent,
    GalleryComponent,
    TeamComponent,
    MembersComponent,
    ContactComponent,
  ],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-activities></app-activities>
    <app-gallery></app-gallery>
    <app-team></app-team>
    <app-members></app-members>
    <app-contact></app-contact>
  `,
})
export class LandingPageComponent {}
