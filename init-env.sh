#!/bin/bash
# Génère un fichier .env avec des secrets aléatoires sécurisés

if [ -f .env ]; then
    echo "Le fichier .env existe déjà. Supprimez-le d'abord si vous voulez régénérer."
    exit 1
fi

echo "Génération du fichier .env avec des secrets aléatoires..."

cat > .env << EOF
PORT=80

# Strapi secrets (auto-generated)
APP_KEYS=$(openssl rand -base64 16),$(openssl rand -base64 16),$(openssl rand -base64 16),$(openssl rand -base64 16)
API_TOKEN_SALT=$(openssl rand -base64 16)
ADMIN_JWT_SECRET=$(openssl rand -base64 24)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 16)
JWT_SECRET=$(openssl rand -base64 24)
ENCRYPTION_KEY=$(openssl rand -base64 16)

# Frontend URL (pour le preview mode Strapi)
CLIENT_URL=http://localhost

# SMTP (optionnel)
SMTP_HOST=
SMTP_PORT=587
SMTP_LOGIN=
SMTP_KEY=
MAIL_FROM_NAME=Jeunes en Action de Dafort
MAIL_FROM_EMAIL=
MAIL_TO_EMAIL=
EOF

echo "Fichier .env généré avec succès !"
echo "Vérifiez avec: cat .env"
