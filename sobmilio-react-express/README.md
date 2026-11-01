# SOBMILIO — React + Node.js / Express Marketplace Foundation

This project preserves the supplied SOBMILIO homepage HTML/CSS and existing interactions as the visual source of truth. A React/Vite shell mounts that original storefront so the established header, menu hover states, category mega-menu, mobile drawer, payment badges, and button sizing/alignment are not inadvertently redesigned during the framework migration. The Express API is a separate backend service.

## Stack
- Frontend shell: React 18 + Vite
- Preserved storefront: original supplied HTML/CSS/JS in `client/public/original-homepage.html`
- Backend: Node.js + Express 4
- Database: PostgreSQL + Prisma schema
- Validation/security baseline: Zod, Helmet, CORS, rate limiting, bcrypt/JWT dependencies

## Run locally
Requirements: Node.js 20+, npm, PostgreSQL (for database-backed features).

1. Copy `server/.env.example` to `server/.env` and set database/JWT values.
2. Install dependencies: `npm run install:all` (or run `npm install` at root, then `npm install` in `client` and `server`).
3. Start both services: `npm run dev`.
4. Frontend: http://localhost:5173 · API health: http://localhost:4000/api/health
5. For database setup: `cd server && npx prisma generate && npx prisma migrate dev --name init`.

## Visual fidelity and payment layout
- The original homepage is preserved as `client/public/original-homepage.html`; only product card art for matching items is swapped to photographic assets.
- The existing `.pm` payment badges and `.payrow` rules are retained unchanged, preserving the equal sizing, spacing and alignment of COD, bKash, Nagad and Visa.
- The original header, brand logo, navigation, hover mega-menu, category order, bilingual labels, hero, promotions, product names, seller names, prices, and content are retained.
- Five optimized WebP product photos are included for backpack, watch, earbuds/headphones, phone and sneakers. Other catalog items retain their original illustration until matching approved product photos are supplied/generated.

## API endpoints
- `GET /api/health`
- `GET /api/catalog/categories`
- `GET /api/catalog/products?category=&search=`
- `GET /api/catalog/products/:slug`
- `POST /api/payments/initiate` (safe integration boundary; COD selection stub; online gateway returns a clear not-configured/provider-adapter response until credentials and callback verification are implemented).

## Production work still required
This is a runnable project foundation, not a claim of a fully audited production marketplace. Before accepting real orders/payments, complete: account registration/login + OTP/email verification; RBAC and seller ownership checks; persistent cart/checkout; transactional order creation and multi-vendor seller-order splitting; bKash/Nagad/SSLCommerz merchant adapters with signature/callback verification and idempotency; inventory reservations; courier APIs; refund/commission/ledger/double-entry accounting; admin/seller/customer dashboards; object storage and upload scanning; policy/CMS pages; email/SMS; automated unit/integration/E2E tests; monitoring, backups and deployment hardening. Never put gateway secrets in frontend code or commit them to Git.

## Important note on “100% best”
No responsible developer can guarantee “best in the world” or production readiness without the final category/product catalogue, approved payment merchant accounts, hosting/domain, business rules, QA and security review. This ZIP provides a strong, branded and runnable starting point while clearly marking external integrations that require credentials and verification.
