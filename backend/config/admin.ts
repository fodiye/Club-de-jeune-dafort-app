import type { Core } from '@strapi/strapi';

const getPreviewPathname = (
  uid: string,
  { locale, document }: { locale?: string; document?: any }
): string => {
  const frontendRoutes: Record<string, string> = {
    'api::hero.hero': '/#accueil',
    'api::a-propos.a-propos': '/#a-propos',
    'api::contact.contact': '/#contact',
    'api::activite.activite': '/#activites',
    'api::membre.membre': '/#membres',
    'api::galerie.galerie': '/#galerie',
    'api::equipe.equipe': '/#equipe',
  };

  return frontendRoutes[uid] || '/';
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'http://localhost')],
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid as any).findOne({ documentId });
        const pathname = getPreviewPathname(uid, { locale, document });
        const clientUrl = env('CLIENT_URL', 'http://localhost');
        return `${clientUrl}${pathname}`;
      },
    },
  },
});

export default config;
