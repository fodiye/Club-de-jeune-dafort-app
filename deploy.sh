#!/bin/bash
set -e

# ==============================================
# Script de déploiement - Jeunes en Action Dafort
# VPS OVH Cloud (Ubuntu/Debian)
# ==============================================

echo "========================================="
echo "  Déploiement Jeunes en Action de Dafort"
echo "========================================="

# 1. Mise à jour système
echo ""
echo "[1/5] Mise à jour du système..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Installation de Docker
echo ""
echo "[2/5] Installation de Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sudo sh
    sudo usermod -aG docker $USER
    echo "Docker installé. Vous devrez peut-être vous reconnecter pour que les permissions prennent effet."
else
    echo "Docker déjà installé."
fi

# 3. Installation de Docker Compose (inclus avec Docker Engine récent)
echo ""
echo "[3/5] Vérification Docker Compose..."
if docker compose version &> /dev/null; then
    echo "Docker Compose disponible."
else
    echo "Installation du plugin Docker Compose..."
    sudo apt-get install -y docker-compose-plugin
fi

# 4. Configuration du firewall
echo ""
echo "[4/5] Configuration du firewall..."
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp    # SSH
    sudo ufw allow 80/tcp    # HTTP
    sudo ufw --force enable
    echo "Firewall configuré (ports 22, 80)."
else
    echo "ufw non disponible, vérifiez votre firewall manuellement."
fi

# 5. Génération du .env si absent
echo ""
echo "[5/6] Vérification du fichier .env..."
if [ ! -f .env ]; then
    echo "Fichier .env absent, génération automatique des secrets..."
    bash init-env.sh
else
    echo "Fichier .env trouvé."
fi

# 6. Lancement de l'application
echo ""
echo "[6/6] Lancement de l'application..."
docker compose up -d --build

echo ""
echo "========================================="
echo "  Déploiement terminé !"
echo "========================================="
echo ""
echo "  Site web    : http://$(curl -s ifconfig.me)"
echo "  Strapi Admin: http://$(curl -s ifconfig.me)/admin/"
echo ""
echo "  Prochaine étape : ouvrez /admin/ pour créer"
echo "  le premier compte administrateur Strapi."
echo "========================================="
