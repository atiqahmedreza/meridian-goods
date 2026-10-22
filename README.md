# Meridian Goods

Meridian Goods is a polished e-commerce storefront built with the Next.js App Router, Firebase Authentication, and a responsive Tailwind UI—with public catalog pages and protected product management.

## Submission

| Deliverable | Link |
|-------------|------|
| **GitHub repository** | [github.com/atiqahmedreza/meridian-goods](https://github.com/atiqahmedreza/meridian-goods) |
| **Live demo (Vercel)** | [remontada-shop.vercel.app](https://remontada-shop.vercel.app) |

This README includes a project description, feature list, setup steps, and route summary below.

## Features

- Landing page with navbar, hero, four themed sections, and footer
- Product catalog with search, category filter, and max-price filter
- Dynamic product detail pages with related items
- Firebase email/password auth plus Google sign-in
- Protected **Add Product** and **Manage Products** routes for signed-in users
- User-added products persisted in `localStorage`

## Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/atiqahmedreza/meridian-goods.git
   cd meridian-goods
   npm install
   ```

2. **Firebase** (required for login, register, and protected routes)

   1. [Create a Firebase project](https://console.firebase.google.com/) (e.g. `meridian-goods`).
   2. **Build** → **Authentication** → **Get started** → enable **Email/Password**.
   3. (Recommended) Enable **Google** under Sign-in providers.
   4. **Project settings** (gear) → **Your apps** → add a **Web** app → copy the `firebaseConfig` values.
   5. In this repo:

      ```bash
      cp .env.example .env.local   # Windows: copy .env.example .env.local
      ```

      Paste each value into `.env.local` (names match the Firebase config fields).

   6. **Authorized domains** (Authentication → Settings → Authorized domains): ensure `localhost` and your production host (e.g. `remontada-shop.vercel.app`) are listed.

   7. Verify locally:

      ```bash
      npm run firebase:check
      npm run dev
      ```

   Test at `/register` and `/login`. After sign-in you should reach `/` with the account menu and access to `/items/add` and `/items/manage`.

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the same `NEXT_PUBLIC_FIREBASE_*` variables in Vercel (**Settings → Environment Variables**), or from a filled `.env.local` run:

   ```bash
   npm run firebase:sync-vercel
   npx vercel deploy --prod
   ```

   (`NEXT_PUBLIC_*` vars are stored as Vercel **Config** — public client values, not secrets.)

4. Redeploy after adding env vars so auth works on the live site.

Production: [remontada-shop.vercel.app](https://remontada-shop.vercel.app)

## Route summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/items` | Public | Catalog with search & filters |
| `/items/[id]` | Public | Product details |
| `/about` | Public | About the app |
| `/login` | Public | Sign in |
| `/register` | Public | Create account |
| `/items/add` | Protected | Add a product (redirects to `/login`) |
| `/items/manage` | Protected | List / view / delete custom products |

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Firebase Auth

## Reference

- [Firebase + Next.js codelab](https://firebase.google.com/codelabs/firebase-nextjs)
