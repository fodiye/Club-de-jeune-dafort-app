import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::cotisation.cotisation', ({ strapi }) => ({
  async findMine(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Vous devez être connecté');
    }

    const membre = await strapi.db.query('api::membre.membre').findOne({
      where: { user: user.id },
    });

    if (!membre) {
      return ctx.notFound('Aucun membre associé à cet utilisateur');
    }

    const cotisations = await strapi.db.query('api::cotisation.cotisation').findMany({
      where: { membre: membre.id },
      orderBy: [{ annee: 'desc' }, { mois: 'desc' }],
    });

    return ctx.send({ data: cotisations });
  },
}));
