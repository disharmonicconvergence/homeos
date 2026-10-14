# HomeOS
## Your home, understood.

**HomeOS** is a consumer technology platform and operating system for the physical home in Urban India. It brings together asset records, warranties, maintenance history, physical inspection findings, and future IoT telemetry into one persistent, actionable record.

---

## 🌟 The Product Thesis

Every home generates information about its assets, maintenance, expenses, services, and physical condition. Today, that information is scattered across invoices, WhatsApp conversations, paper manuals, and word-of-mouth service providers. HomeOS consolidates it into a living digital ledger to answer five fundamental questions:

1. **What do I have in my home?** (Inventory, systems, warranties, invoices)
2. **What condition is it in?** (Certified visual & operational health assessment)
3. **What needs attention, and how urgently?** (Clear 4-tier severity matrix)
4. **Who can help me resolve it?** (Vetted local specialists with 0% consumer markup)
5. **What has happened to my home over time?** (Permanent chronological timeline)

For someone considering a property:
**"What am I committing to, and what should I know before I sign?"**

---

## 🧭 The Two Core User Journeys

HomeOS features two distinct physical inspection services sharing a unified diagnostic framework:

### Journey A: Free Home X-Ray (For Existing Residents)
* **Target:** Homeowners and residents already living in the home.
* **Model:** Free physical assessment at launch as a frictionless acquisition and onboarding mechanism.
* **Experience:** An accredited assessor audits wet areas, electrical DB panels, HVAC lines, water purifiers, and fixtures. The findings automatically populate the homeowner's digital inventory, health score (e.g. 84/100), and interactive maintenance planner.

### Journey B: Inspect Before You Commit (For Prospective Buyers & Renters)
* **Target:** Individuals evaluating an apartment or house before signing a rental lease or purchase deed.
* **Model:** Transparent, paid appointment-based service (from ₹2,499 for renters; from ₹3,999 for buyers).
* **For Renters:** Documents pre-existing cosmetic wear (e.g. wall scuffs, hairline tile chips, countertop stains) with timestamped high-resolution photos to eliminate security deposit deductions upon move-out, along with a repair punch-list for the landlord.
* **For Buyers:** Detects sub-surface moisture efflorescence, audits electrical line stability, tests water pressure/TDS, and formats critical questions for the seller, broker, and society management.
* **1-Click Conversion:** If the user commits to the property, one click converts the Pre-Commitment Report into their active HomeOS profile.

---

## 🖥️ Screen Architecture (All 12 Screens Implemented)

| Route | Screen Name | Key Functionality |
|---|---|---|
| `/` | **Home Overview** | Health score (84/100), priority finding alerts, upcoming tasks, live telemetry preview, chronological history |
| `/inventory` | **Home Inventory Register** | Organized appliances & systems, category & condition filtering, search, add asset dialog |
| `/asset/[id]` | **Asset Detail** | Specs, warranty status, stored document vault (invoices/manuals), service history ledger, logging new visits |
| `/xray-report` | **Home X-Ray Report** | Executive summary, severity classifications, photo evidence, scope & limitations, printable view |
| `/finding/[id]` | **Finding Detail** | High-res evidence, moisture/thermal metrics, implications, interactive status controller, contractor quote modal |
| `/maintenance` | **Maintenance Planner** | Task list, priority filtering, interactive "Mark Completed" (updates health score & timeline), provider scheduling |
| `/marketplace` | **Service Marketplace** | Vetted Urban India contractors (Plumbing, RO, Electrical, HVAC), 0% consumer commission, transparent base rates |
| `/monitoring` | **Home Observability Preview** | Overhead & sump water tank levels, live power wattage & voltage stability, wet zone acoustic leak sensors |
| `/inspect` | **Inspect Before You Commit** | Buyer vs Renter proposition, interactive fee calculator, service comparison matrix, scope boundaries |
| `/inspect/book` | **Property Inspection Booking** | 3-step booking flow: property details, viewing slot & specific concerns, transparent scope & confirmation |
| `/inspect/sample-report` | **Property Inspection Report** | Pre-commit report with landlord punch-list, security deposit photographic baseline, questions for seller |
| `/inspect/sample-report` | **Convert to Home Record** | 1-Click action converting pre-commitment findings and baseline photos into the user's permanent HomeOS profile |

---

## 🛠️ Technology Stack & Architecture

* **Framework:** [AstroJS 7](https://astro.build/) (Static Site Generation output for maximum speed and Cloudflare compatibility)
* **Language:** TypeScript
* **UI Component Library:** [shadcn/ui](https://ui.shadcn.com/) (Button, Card, Badge, Dialog, Tabs, Input, Label, Separator)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with shadcn/ui design tokens and CSS variables
* **Icons:** [Lucide React](https://lucide.dev/)
* **Interactive Islands:** React 19 (`client:load`)
* **State Management:** Reactive client-side store with `localStorage` persistence and cross-component custom events (`src/data/store.ts`)
* **Hosting Target:** Cloudflare Pages (Static output in `dist/`)

---

## 🚀 Running Locally

### 1. Prerequisites
* Node.js `>= 22.12.0`
* npm `>= 10.0.0`

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates production-optimized static assets in the `./dist` directory in < 1 second.

---

## ☁️ Cloudflare Deployment

This application is built with Astro's static output mode, making it 100% natively compatible with **Cloudflare Pages**.

### Option A: Deploy via Wrangler CLI
1. Login to your Cloudflare account:
   ```bash
   npx wrangler login
   ```
2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```
   *(Or run `npx wrangler pages deploy dist --project-name=homeos`)*

### Option B: Deploy via Cloudflare Dashboard (Git Integration)
1. Push this repository to GitHub or GitLab.
2. In the Cloudflare Dashboard, navigate to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select your repository and configure the build settings:
   * **Framework Preset:** Astro
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
   * **Node version:** `22.x`
4. Click **Save and Deploy**.

---

## 💼 Business Model & Product Principles

1. **Consumer First:** Free core product for homeowners (inventory, reports, maintenance planner).
2. **Zero Consumer Marketplace Commissions:** HomeOS remains neutral. Providers pay a flat monthly SaaS subscription for job management tools, avoiding biased contractor recommendations.
3. **Distinct Inspection Boundaries:** All visual and operational assessments explicitly communicate boundaries (non-destructive; does not certify legal title or concealed structural rebar).
4. **Permanent Digital Continuity:** Physical inspections serve as the initial data intake that turns into a living, perpetual operating record for the physical home.
