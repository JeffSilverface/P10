# CLAUDE.md

Contexte et conventions du projet pour l'assistance au développement et l'équipe.

## Objet du projet

PoC démontrant la faisabilité du **chat de support en temps réel** de l'architecture Your Car
Your Way. Périmètre strict : chat (envoi POST, réception SSE, notification). Tout le reste
(auth réelle, paiement, réservation) est **hors périmètre** — ne pas l'implémenter.

## Stack imposée

- **Front** : React / Next.js, Tailwind CSS, shadcn/ui (composants basés sur Radix, accessibles par défaut)
- **Back** : NestJS (TypeScript)
- **ORM** : Prisma
- **Base** : PostgreSQL
- **Temps réel** : SSE pour la réception, POST pour l'envoi. **Ne pas** utiliser WebSocket.

## Principes d'architecture à respecter

- **SSE en réception, POST en envoi** : deux canaux découplés. Un message part en POST, les
  messages entrants (et les notifications) arrivent par le canal SSE.
- **Le front n'est jamais source de vérité** : toute logique et validation côté back.
- **Notifications mutualisées** : elles passent par le même canal SSE que les messages, avec un
  `type` d'événement distinct (ex. `message`, `notification`).
- **Identité simulée** : un identifiant passé en paramètre suffit pour distinguer client et
  support. Ne pas implémenter d'authentification.

## Modèle de données (Prisma)

Deux entités principales pour le chat :

- **Conversation** : `id`, `clientId`, `reservationId` (optionnel), `initiatedBy`, `status`, `createdAt`.
- **Message** : `id`, `conversationId`, `senderType` (`CLIENT` | `SUPPORT`), `content`, `sentAt`.

Enums : `SenderType` (CLIENT, SUPPORT), `ConversationStatus` (OPEN, CLOSED).

## Conventions de code

- **Langue du code** : anglais (noms d'entités, variables, statuts).
- **TypeScript strict** : typage systématique, pas de `any`.
- **Nommage** : camelCase pour variables/fonctions, PascalCase pour classes/composants.
- **Back** : découpage NestJS par module (un module `chat`). Injection de dépendances native.
- **Front** : composants shadcn/ui wrappés pour la personnalisation. Pas de logique métier côté front.
- **Commits** : messages clairs, format conventionnel (`feat:`, `fix:`, `docs:`...).

## Le point technique clé

L'association **client ↔ canal SSE** côté serveur : le back doit savoir sur quelle connexion SSE
ouverte pousser un message entrant destiné à un client donné. C'est le cœur de la démonstration.

## À ne pas faire

- Pas de WebSocket (SSE + POST uniquement).
- Pas d'authentification réelle (identité simulée).
- Pas de logique métier hors périmètre chat.
- Pas de données personnelles dans les logs.
- Ne pas transformer la PoC en produit : interface minimale, focus sur la structure technique.

## Commandes utiles

```bash
# API
cd apps/api && npm run start:dev
npx prisma migrate dev
npx prisma studio

# Front
cd apps/web && npm run dev

# Tout via Docker
docker compose up
```
