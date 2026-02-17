import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  members = [
    {
      name: 'Abdoulaye Diallo',
      initials: 'AD',
      role: 'Président',
      description: 'Passionné par le développement communautaire et leader engagé pour la jeunesse de Dafort.',
      color: 'linear-gradient(135deg, #1B9C85, #148F7A)'
    },
    {
      name: 'Aminata Sow',
      initials: 'AS',
      role: 'Vice-Présidente',
      description: 'Dynamique et créative, elle coordonne les projets culturels et éducatifs de l\'association.',
      color: 'linear-gradient(135deg, #2563EB, #1D4ED8)'
    },
    {
      name: 'Moussa Ba',
      initials: 'MB',
      role: 'Secrétaire Général',
      description: 'Organisé et rigoureux, il assure le bon fonctionnement administratif de l\'association.',
      color: 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
    },
    {
      name: 'Fatou Ndiaye',
      initials: 'FN',
      role: 'Trésorière',
      description: 'Experte en gestion, elle veille à la bonne utilisation des ressources de l\'association.',
      color: 'linear-gradient(135deg, #F59E0B, #D97706)'
    }
  ];
}
