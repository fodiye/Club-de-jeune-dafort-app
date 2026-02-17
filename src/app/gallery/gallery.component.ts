import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  photos = [
    { id: 1, icon: '\u26BD', label: 'Tournoi de Football', gradient: 'linear-gradient(135deg, #10B981, #059669)', size: 'large' },
    { id: 2, icon: '\uD83C\uDFA4', label: 'Soirée Culturelle', gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', size: '' },
    { id: 3, icon: '\uD83C\uDF33', label: 'Journée Reboisement', gradient: 'linear-gradient(135deg, #1B9C85, #148F7A)', size: '' },
    { id: 4, icon: '\uD83D\uDCDA', label: 'Atelier Formation', gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)', size: '' },
    { id: 5, icon: '\uD83E\uDD1D', label: 'Action Solidaire', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)', size: '' },
    { id: 6, icon: '\uD83C\uDF89', label: 'Fête Annuelle', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', size: 'large' },
    { id: 7, icon: '\uD83C\uDFD3', label: 'Compétition Sportive', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)', size: '' },
    { id: 8, icon: '\uD83C\uDFA8', label: 'Exposition Art', gradient: 'linear-gradient(135deg, #EC4899, #DB2777)', size: '' },
  ];
}
