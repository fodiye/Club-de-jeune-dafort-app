import type { Schema, Struct } from '@strapi/strapi';

export interface ConNousRejoindre extends Struct.ComponentSchema {
  collectionName: 'components_con_nous_rejoindre_s';
  info: {
    displayName: 'nous rejoindre ';
    icon: 'alien';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'con.nous-rejoindre': ConNousRejoindre;
    }
  }
}
