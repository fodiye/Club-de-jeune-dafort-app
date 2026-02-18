import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set public permissions for all content types
    await setPublicPermissions(strapi);

    // Seed data if empty
    await seedData(strapi);
  },
};

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) return;

  const contentTypes = [
    { uid: 'api::membre.membre', actions: ['find', 'findOne'] },
    { uid: 'api::activite.activite', actions: ['find', 'findOne'] },
    { uid: 'api::galerie.galerie', actions: ['find', 'findOne'] },
    { uid: 'api::equipe.equipe', actions: ['find', 'findOne'] },
    { uid: 'api::hero.hero', actions: ['find'] },
    { uid: 'api::a-propos.a-propos', actions: ['find'] },
    { uid: 'api::contact.contact', actions: ['find'] },
    { uid: 'api::message.message', actions: ['create'] },
  ];

  for (const ct of contentTypes) {
    for (const action of ct.actions) {
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          role: publicRole.id,
          action: `${ct.uid}.${action}`,
        },
      });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            role: publicRole.id,
            action: `${ct.uid}.${action}`,
          },
        });
      }
    }
  }

  console.log('✅ Public permissions configured');
}

async function seedData(strapi: Core.Strapi) {
  // Check if data already exists
  const existingActivites = await strapi.db.query('api::activite.activite').count();
  if (existingActivites > 0) {
    console.log('📦 Data already seeded, skipping');
    return;
  }

  console.log('🌱 Seeding initial data...');

  // Seed Hero
  await strapi.db.query('api::hero.hero').create({
    data: {
      badge: 'Association de Jeunes',
      titre: 'Jeunes en Action de Dafort',
      sous_titre: 'de Dafort',
      description: 'Ensemble, construisons un avenir meilleur pour notre communauté. Rejoignez le mouvement des jeunes qui font la différence !',
      bouton_principal_texte: 'Nous Rejoindre',
      bouton_principal_lien: '#contact',
      bouton_secondaire_texte: 'En savoir plus',
      bouton_secondaire_lien: '#a-propos',
    },
  });

  // Seed A Propos
  await strapi.db.query('api::a-propos.a-propos').create({
    data: {
      titre_mission: 'Notre Mission',
      texte_mission: "L'Association Jeunes en Action de Dafort est une organisation dynamique créée par et pour les jeunes de Dafort. Notre mission est de promouvoir le développement communautaire, l'éducation et l'engagement citoyen des jeunes de notre localité.",
      titre_vision: 'Notre Vision',
      texte_vision: "Nous aspirons à construire une communauté où chaque jeune a les moyens de s'épanouir, de contribuer positivement à la société et de devenir un acteur du changement dans son environnement.",
    },
  });

  // Seed Contact
  await strapi.db.query('api::contact.contact').create({
    data: {
      adresse: 'Dafort, Sénégal',
      telephone: '+221 XX XXX XX XX',
      email: 'contact@jeunesenaction-dafort.org',
      facebook_url: '#',
      instagram_url: '#',
      whatsapp_url: '#',
    },
  });

  // Seed Activites
  const activites = [
    { icone: '📖', titre: 'Aide aux devoirs', description: 'Accompagnement quotidien des élèves dans la réalisation de leurs devoirs et exercices scolaires.', couleur: '#2563EB', ordre: 1 },
    { icone: '🧮', titre: 'Cours de mathématiques', description: 'Séances de renforcement en mathématiques pour tous les niveaux, du primaire au collège.', couleur: '#8B5CF6', ordre: 2 },
    { icone: '✍️', titre: 'Français et rédaction', description: "Ateliers de lecture, grammaire, conjugaison et expression écrite pour améliorer le niveau des élèves.", couleur: '#1B9C85', ordre: 3 },
    { icone: '🔬', titre: 'Sciences et découvertes', description: 'Cours de soutien en sciences physiques et naturelles avec des expériences pratiques.', couleur: '#EF4444', ordre: 4 },
    { icone: '🎯', titre: 'Préparation aux examens', description: "Sessions intensives de révision et d'entraînement pour préparer les élèves aux examens de fin d'année.", couleur: '#F59E0B', ordre: 5 },
    { icone: '📝', titre: 'Méthodologie de travail', description: "Ateliers pour apprendre aux élèves à s'organiser, prendre des notes et réviser efficacement.", couleur: '#06B6D4', ordre: 6 },
  ];
  for (const a of activites) {
    await strapi.db.query('api::activite.activite').create({ data: a });
  }

  // Seed Galerie
  const galeries = [
    { icone: '📚', label: 'Séance de soutien scolaire', gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)', taille: 'large' as const, ordre: 1 },
    { icone: '✍️', label: "Atelier d'écriture", gradient: 'linear-gradient(135deg, #1B9C85, #148F7A)', taille: 'normal' as const, ordre: 2 },
    { icone: '🧮', label: 'Cours de mathématiques', gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', taille: 'normal' as const, ordre: 3 },
    { icone: '📖', label: 'Aide aux devoirs', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', taille: 'normal' as const, ordre: 4 },
    { icone: '🎓', label: 'Remise de fournitures', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)', taille: 'normal' as const, ordre: 5 },
    { icone: '🎯', label: 'Préparation aux examens', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)', taille: 'large' as const, ordre: 6 },
    { icone: '🔬', label: 'Atelier sciences', gradient: 'linear-gradient(135deg, #10B981, #059669)', taille: 'normal' as const, ordre: 7 },
    { icone: '🏫', label: 'Journée portes ouvertes', gradient: 'linear-gradient(135deg, #EC4899, #DB2777)', taille: 'normal' as const, ordre: 8 },
  ];
  for (const g of galeries) {
    await strapi.db.query('api::galerie.galerie').create({ data: g });
  }

  // Seed Equipe
  const equipe = [
    { nom: 'Abdoulaye Diallo', initiales: 'AD', role: 'Président', description: 'Passionné par le développement communautaire et leader engagé pour la jeunesse de Dafort.', couleur: 'linear-gradient(135deg, #1B9C85, #148F7A)', ordre: 1 },
    { nom: 'Aminata Sow', initiales: 'AS', role: 'Vice-Présidente', description: "Dynamique et créative, elle coordonne les projets culturels et éducatifs de l'association.", couleur: 'linear-gradient(135deg, #2563EB, #1D4ED8)', ordre: 2 },
    { nom: 'Moussa Ba', initiales: 'MB', role: 'Secrétaire Général', description: "Organisé et rigoureux, il assure le bon fonctionnement administratif de l'association.", couleur: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', ordre: 3 },
    { nom: 'Fatou Ndiaye', initiales: 'FN', role: 'Trésorière', description: "Experte en gestion, elle veille à la bonne utilisation des ressources de l'association.", couleur: 'linear-gradient(135deg, #F59E0B, #D97706)', ordre: 4 },
  ];
  for (const e of equipe) {
    await strapi.db.query('api::equipe.equipe').create({ data: e });
  }

  // Seed Membres
  const membres = [
    { nom: 'Abdoulaye Diallo', initiales: 'AD', role: 'Président', couleur: 'linear-gradient(135deg, #1B9C85, #148F7A)', ordre: 1 },
    { nom: 'Aminata Sow', initiales: 'AS', role: 'Vice-Présidente', couleur: 'linear-gradient(135deg, #2563EB, #1D4ED8)', ordre: 2 },
    { nom: 'Moussa Ba', initiales: 'MB', role: 'Secrétaire Général', couleur: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', ordre: 3 },
    { nom: 'Fatou Ndiaye', initiales: 'FN', role: 'Trésorière', couleur: 'linear-gradient(135deg, #F59E0B, #D97706)', ordre: 4 },
    { nom: 'Ousmane Sy', initiales: 'OS', role: 'Membre', couleur: 'linear-gradient(135deg, #EF4444, #DC2626)', ordre: 5 },
    { nom: 'Mariama Diop', initiales: 'MD', role: 'Membre', couleur: 'linear-gradient(135deg, #EC4899, #DB2777)', ordre: 6 },
    { nom: 'Ibrahima Camara', initiales: 'IC', role: 'Membre', couleur: 'linear-gradient(135deg, #14B8A6, #0D9488)', ordre: 7 },
    { nom: 'Aissatou Barry', initiales: 'AB', role: 'Membre', couleur: 'linear-gradient(135deg, #6366F1, #4F46E5)', ordre: 8 },
    { nom: 'Mamadou Kane', initiales: 'MK', role: 'Membre', couleur: 'linear-gradient(135deg, #F97316, #EA580C)', ordre: 9 },
    { nom: 'Kadiatou Bah', initiales: 'KB', role: 'Membre', couleur: 'linear-gradient(135deg, #06B6D4, #0891B2)', ordre: 10 },
    { nom: 'Samba Tall', initiales: 'ST', role: 'Membre', couleur: 'linear-gradient(135deg, #84CC16, #65A30D)', ordre: 11 },
    { nom: 'Fatoumata Cissé', initiales: 'FC', role: 'Membre', couleur: 'linear-gradient(135deg, #A855F7, #9333EA)', ordre: 12 },
  ];
  for (const m of membres) {
    await strapi.db.query('api::membre.membre').create({ data: m });
  }

  console.log('✅ Data seeded successfully');
}
