# Your Car Your Way — PoC Chat

Preuve de concept démontrant la faisabilité technique du **chat de support en temps réel**
de l'architecture cible Your Car Your Way.

Le périmètre est volontairement restreint au chat : envoi de messages, réception en temps
réel, et notification. L'authentification, le paiement et le reste de l'application sont **hors
périmètre** de cette PoC.

## Ce que la PoC démontre

- Envoi de messages par requête **POST**.
- Réception des messages en temps réel via **SSE** (Server-Sent Events).
- Association côté serveur entre un client et son canal SSE (le point technique clé).
- Mutualisation du canal SSE : les **notifications** transitent par le même flux, via un type
  d'événement distinct.

## Stack

| Couche | Technologie |
|---|---|
| Front | React / Next.js, Tailwind CSS, shadcn/ui |
| Back | NestJS (TypeScript) |
| ORM | Prisma |
| Base | PostgreSQL |
| Temps réel | SSE (réception) + POST (envoi) |

## Structure du monorepo

```
.
├── apps/
│   ├── web/          # Front Next.js
│   └── api/          # Back NestJS
├── docker-compose.yml
└── README.md
```

## Prérequis

- Node.js 24+
- pnpm
- Docker et Docker Compose (pour le lancement recommandé)

## Lancement (recommandé : Docker)

```bash
docker compose up
```

- Front : http://localhost:3000
- API : http://localhost:3001

## Lancement manuel (sans Docker)

Une base PostgreSQL doit être disponible et renseignée dans `apps/api/.env`
(voir `.env.example`).

```bash
pnpm install
cd apps/api && npx prisma migrate dev && cd ../..

# Lance le front et l'API en parallèle, depuis la racine
pnpm dev
```

## Utilisation

La PoC simule deux interlocuteurs via deux liens (l'identité est simulée, pas d'authentification) :

- **Client** : http://localhost:3000/client
- **Support** : http://localhost:3000/support

Ouvrir les deux dans deux fenêtres. Un message envoyé d'un côté apparaît en temps réel de
l'autre. La cloche de notification s'active à la réception d'un message.

## Variables d'environnement

Voir `apps/api/.env.example`. Principales variables :

| Variable | Description |
|---|---|
| `DATABASE_URL` | Chaîne de connexion PostgreSQL |
| `PORT` | Port de l'API (défaut 3001) |

## Limites (assumées)

- Authentification **simulée** : en production, elle est déléguée au fournisseur d'identité.
- Interface volontairement minimale : la PoC démontre la structure technique, pas l'UX finale.
- Périmètre chat uniquement.
