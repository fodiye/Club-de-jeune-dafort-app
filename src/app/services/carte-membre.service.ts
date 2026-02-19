import { Injectable } from '@angular/core';
import { MembreProfile } from '../auth/auth.service';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export interface CardTheme {
  id: string;
  label: string;
  accent: [number, number, number];
  accentHex: string;
  bg: [number, number, number];
  bgHex: string;
  bgLight: [number, number, number];
}

export const CARD_THEMES: CardTheme[] = [
  {
    id: 'emerald',
    label: 'Émeraude',
    accent: [27, 156, 133],
    accentHex: '#1B9C85',
    bg: [12, 18, 34],
    bgHex: '#0c1222',
    bgLight: [22, 32, 50],
  },
  {
    id: 'ocean',
    label: 'Océan',
    accent: [37, 99, 235],
    accentHex: '#2563EB',
    bg: [15, 23, 42],
    bgHex: '#0f172a',
    bgLight: [30, 41, 59],
  },
  {
    id: 'purple',
    label: 'Violet',
    accent: [139, 92, 246],
    accentHex: '#8B5CF6',
    bg: [20, 15, 35],
    bgHex: '#140f23',
    bgLight: [35, 25, 55],
  },
  {
    id: 'gold',
    label: 'Or',
    accent: [245, 158, 11],
    accentHex: '#F59E0B',
    bg: [30, 20, 10],
    bgHex: '#1e140a',
    bgLight: [45, 35, 20],
  },
  {
    id: 'rose',
    label: 'Rose',
    accent: [236, 72, 153],
    accentHex: '#EC4899',
    bg: [30, 15, 25],
    bgHex: '#1e0f19',
    bgLight: [45, 25, 40],
  },
  {
    id: 'slate',
    label: 'Ardoise',
    accent: [148, 163, 184],
    accentHex: '#94A3B8',
    bg: [15, 23, 42],
    bgHex: '#0f172a',
    bgLight: [30, 41, 59],
  },
];

@Injectable({
  providedIn: 'root',
})
export class CarteMembreService {
  private readonly W = 85.6;
  private readonly H = 54;
  private readonly WHITE: [number, number, number] = [255, 255, 255];
  private readonly GRAY: [number, number, number] = [148, 163, 184];
  private readonly GRAY_DARK: [number, number, number] = [71, 85, 105];
  private readonly LIGHT_GRAY: [number, number, number] = [203, 213, 225];

  async generateCarte(membre: MembreProfile, theme: CardTheme): Promise<void> {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [this.W, this.H],
    });

    const annee = new Date().getFullYear().toString();

    // === BACKGROUND ===
    doc.setFillColor(...theme.bg);
    doc.rect(0, 0, this.W, this.H, 'F');

    // Subtle glow
    doc.setFillColor(...theme.accent);
    doc.setGState(new (doc as any).GState({ opacity: 0.06 }));
    doc.circle(this.W - 5, 5, 25, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1 }));

    // === TOP ROW ===
    const topY = 8;

    // JA logo box
    doc.setFillColor(...theme.accent);
    doc.roundedRect(7, topY - 3.5, 9, 9, 2, 2, 'F');
    doc.setTextColor(...this.WHITE);
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'bold');
    doc.text('JA', 11.5, topY + 1.5, { align: 'center' });

    // Org name
    doc.setTextColor(...this.WHITE);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('Jeunes en Action', 19, topY - 0.5);
    doc.setTextColor(...this.GRAY_DARK);
    doc.setFontSize(4.5);
    doc.setFont('helvetica', 'normal');
    doc.text('de Dafort', 19, topY + 2.5);

    // Year badge
    doc.setFillColor(...theme.accent);
    doc.setGState(new (doc as any).GState({ opacity: 0.15 }));
    doc.roundedRect(this.W - 22, topY - 2.5, 15, 6, 3, 3, 'F');
    doc.setGState(new (doc as any).GState({ opacity: 1 }));
    doc.setDrawColor(...theme.accent);
    doc.setLineWidth(0.2);
    doc.roundedRect(this.W - 22, topY - 2.5, 15, 6, 3, 3, 'S');
    doc.setTextColor(...theme.accent);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.text(annee, this.W - 14.5, topY + 1, { align: 'center' });

    // === DIVIDER ===
    doc.setDrawColor(...theme.accent);
    doc.setLineWidth(0.15);
    doc.setGState(new (doc as any).GState({ opacity: 0.3 }));
    doc.line(7, 16, this.W - 7, 16);
    doc.setGState(new (doc as any).GState({ opacity: 1 }));

    // === BODY ===
    const bodyY = 22;
    const avatarX = 17;
    const avatarY = bodyY + 5;

    doc.setFillColor(...theme.accent);
    doc.circle(avatarX, avatarY, 6.5, 'F');
    doc.setTextColor(...this.WHITE);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(membre.initiales, avatarX, avatarY + 1.5, { align: 'center' });

    doc.setTextColor(...this.WHITE);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(membre.nom, 27, bodyY + 3);

    doc.setTextColor(...this.GRAY);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.text(membre.role, 27, bodyY + 7.5);

    // === BOTTOM ROW ===
    const bottomY = this.H - 8;

    doc.setDrawColor(255, 255, 255);
    doc.setGState(new (doc as any).GState({ opacity: 0.05 }));
    doc.setLineWidth(0.15);
    doc.line(7, bottomY - 5, this.W - 7, bottomY - 5);
    doc.setGState(new (doc as any).GState({ opacity: 1 }));

    doc.setTextColor(...this.GRAY_DARK);
    doc.setFontSize(3.5);
    doc.setFont('helvetica', 'bold');
    doc.text('N\u00B0 MEMBRE', 7, bottomY - 1.5);
    doc.setTextColor(...this.LIGHT_GRAY);
    doc.setFontSize(5.5);
    doc.setFont('courier', 'bold');
    doc.text(membre.numero_membre, 7, bottomY + 2);

    doc.setTextColor(...this.GRAY_DARK);
    doc.setFontSize(3.5);
    doc.setFont('helvetica', 'bold');
    doc.text('STATUT', 42, bottomY - 1.5);
    doc.setTextColor(...theme.accent);
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'bold');
    doc.text('Actif', 42, bottomY + 2);

    // QR Code
    const qrSize = 12;
    const verifyUrl = `${window.location.origin}/verify/${membre.numero_membre}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 0,
      color: { dark: theme.accentHex, light: theme.bgHex },
    });
    doc.addImage(
      qrDataUrl,
      'PNG',
      this.W - qrSize - 5,
      this.H - qrSize - 5,
      qrSize,
      qrSize
    );

    doc.save(`carte-membre-${membre.numero_membre}.pdf`);
  }
}
