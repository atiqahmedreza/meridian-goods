# Meridian Goods

Meridian Goods is a polished e-commerce storefront built with the Next.js App Router, Firebase Authentication, and a responsive Tailwind UI—with public catalog pages and protected product management.

## Submission

| Deliverable | Link |
|-------------|------|
| **GitHub repository** | [github.com/atiqahmedreza/meridian-goods](https://github.com/atiqahmedreza/meridian-goods) |
| **Live demo (Vercel)** | [meridian-goods.vercel.app](https://meridian-goods.vercel.app) |

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

2. **Firebase**

   - Create a project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** → Email/Password and Google (optional)
   - Copy your web app config into `.env.local` (see `.env.example`)

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the same `NEXT_PUBLIC_FIREBASE_*` environment variables (required for login/register on the live site)
4. Deploy

Production: [meridian-goods.vercel.app](https://meridian-goods.vercel.app)

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
