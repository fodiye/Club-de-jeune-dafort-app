import { Component } from '@angular/core';

@Component({
  selector: 'app-activities',
  imports: [],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activities = [
    {
      icon: '\u26BD',
      title: 'Sport',
      description: 'Tournois de football, basketball et activités sportives pour promouvoir la santé et l\'esprit d\'équipe.',
      color: '#10B981'
    },
    {
      icon: '\uD83C\uDFA8',
      title: 'Culture',
      description: 'Événements culturels, théâtre, musique et danse pour valoriser notre patrimoine et nos talents.',
      color: '#8B5CF6'
    },
    {
      icon: '\uD83D\uDCDA',
      title: 'Éducation',
      description: 'Soutien scolaire, formations professionnelles et ateliers de développement personnel.',
      color: '#2563EB'
    },
    {
      icon: '\uD83C\uDF3F',
      title: 'Environnement',
      description: 'Journées de reboisement, nettoyage et sensibilisation à la protection de l\'environnement.',
      color: '#059669'
    },
    {
      icon: '\u2764\uFE0F',
      title: 'Solidarité',
      description: 'Actions sociales, aide aux personnes vulnérables et projets de développement communautaire.',
      color: '#EF4444'
    },
    {
      icon: '\uD83C\uDFAE',
      title: 'Loisirs',
      description: 'Sorties récréatives, jeux, excursions et moments de convivialité pour renforcer les liens.',
      color: '#F59E0B'
    }
  ];
}
