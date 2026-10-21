# CITIUSCOMM — Next-Generation Website Clone

> **Live Reference:** [citiuscomm.com](https://citiuscomm.com/)  
> **Tech Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router DOM 7  
> **Testing Suite:** Vitest · React Testing Library · Playwright E2E (Desktop Chrome & Mobile)  
> **Architecture:** Single Source of Truth (`src/data/site.ts`) → All 19 pages stay synchronized

---

## 📌 Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [Global Code — Single Source of Truth](#3-global-code--single-source-of-truth)
4. [Routing — All 19 Pages](#4-routing--all-19-pages)
5. [Aesthetic & Design System](#5-aesthetic--design-system)
6. [Testing & Quality Assurance](#6-testing--quality-assurance)
7. [Build and Dev Commands](#7-build-and-dev-commands)

---

## 1. Technology Stack

| Layer            | Technology                  | Version   | Purpose                                      |
|------------------|-----------------------------|-----------|----------------------------------------------|
| UI Framework     | React                       | 19.x      | Component architecture                       |
| Language         | TypeScript                  | 5.x       | Type safety & schema integrity               |
| Bundler          | Vite                        | 8.x       | Lightning-fast HMR and optimized bundle     |
| CSS Framework    | Tailwind CSS                | 4.x       | Modern utility-first CSS                     |
| Routing          | React Router DOM            | 7.x       | Client-side declarative routing              |
| Unit Tests       | Vitest + Testing Library    | 4.x       | Unit, schema & form validation testing       |
| E2E Tests        | Playwright                  | 1.63.x    | Visual regression, viewport & overflow tests |
| Typography       | Google Fonts (Rubik, Open Sans, Nunito) | — | Official brand font families                 |

---

## 2. Project Structure

```
citiuscomm/
│
├── src/
│   ├── main.tsx              ← Application entry point
│   ├── App.tsx               ← Router + ONE Header + ONE Footer + ScrollToTop
│   ├── index.css             ← Tailwind v4 styling, brand colors & micro-interactions
│   │
│   ├── data/
│   │   └── site.ts           ← SINGLE SOURCE OF TRUTH (all routes, company info, partners, clients)
│   │
│   ├── components/
│   │   ├── Header.tsx        ← ONE header with top bar, dropdowns & mobile drawer
│   │   ├── Footer.tsx        ← ONE footer with locations, quick links & copyright
│   │   ├── Widgets.tsx       ← Shared PageHero, CaseStudyCard, ContactForm, CareerForm, CTASection
│   │   ├── SmartLink.tsx     ← Internal/external link handler
│   │   ├── ScrollToTop.tsx   ← Resets window scroll position on route transitions
│   │   └── Icons.tsx         ← Crisp SVG icon library
│   │
│   └── pages/                ← All 19 high-fidelity page components
│       ├── HomePage.tsx
│       ├── CompanyProfilePage.tsx
│       ├── WhyUsPage.tsx
│       ├── LeadershipPage.tsx
│       ├── PartnersPage.tsx
│       ├── ProductsPage.tsx
│       ├── DigitalServicesPage.tsx
│       ├── NetworkingPage.tsx
│       ├── FttxPage.tsx
│       ├── ServerStoragePage.tsx
│       ├── DataCenterCloudPage.tsx
│       ├── IndustryApplicationsPage.tsx
│       ├── SecuritySolutionsPage.tsx
│       ├── CaseStudiesPage.tsx
│       ├── RakutenMobilePage.tsx
│       ├── NepalTelecomPage.tsx
│       ├── NetBroadbandPage.tsx
│       ├── CareersPage.tsx
│       └── ContactPage.tsx
│
├── tests/
│   ├── setup.ts              ← JSDOM polyfills & cleanup
│   ├── unit/
│   │   └── Site.test.tsx     ← Vitest unit tests (33 tests covering all routes, forms & schema)
│   └── e2e/
│       └── site.spec.ts      ← Playwright tests across desktop & mobile viewports
│
├── public/
│   ├── images/               ← 190+ full resolution original images & logos
│   ├── favicon.ico
│   └── favicon.png
│
├── playwright.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Global Code — Single Source of Truth

### File: `src/data/site.ts`

All core data is defined in `src/data/site.ts`:
- **`LINKS`**: Type-safe dictionary of all 19 routes.
- **`COMPANY_INFO`**: Official brand identity, phone, email, addresses, and retina logos.
- **`MAIN_NAV`**: Header navigation structure and multi-level dropdowns.
- **`LEADERSHIP_TEAM`**: Executive bios for Surendra Sancheti, Pramod Yadav, and Piyush Dikshit.
- **`PARTNERS_LIST`**: 15+ premier OEM partners (Cisco, Juniper, Dell, HPE, Oracle, etc.).
- **`CLIENTS_LIST`**: 21 carrier client logos (Reliance Jio, Vi, Rakuten, Nepal Telecom, etc.).
- **`CASE_STUDIES`**: Detailed case studies for Rakuten Mobile, Nepal Telecom, and Net+ Broadband.
- **`CAREER_OPENINGS`**: Full job specifications for IP Engineers, Linux Analysts, and Security Engineers.
- **`OFFICES_LIST`**: Delhi Head Office, Mumbai, and Kolkata branch offices.

---

## 4. Routing — All 19 Pages

1. **Home**: `/`
2. **Company Profile**: `/company-profile/`
3. **Why Us**: `/why-us/`
4. **Leadership**: `/leadership/`
5. **Partners**: `/partners/`
6. **Products (Solutions Overview)**: `/products/`
7. **Digital Services**: `/digital-services/`
8. **Networking**: `/networking/`
9. **FTTX**: `/fttx/`
10. **Server & Storage**: `/server-storage/`
11. **Data Center & Cloud**: `/data-center-cloud/`
12. **Industry Applications**: `/industry-applications/`
13. **Security Solutions**: `/security-solutions/`
14. **Case Studies Hub**: `/case-studies/`
15. **Rakuten Mobile**: `/rakuten-mobile/`
16. **Nepal Telecom**: `/nepal-telecom/`
17. **Net+ Broadband**: `/net-broadband/`
18. **Careers**: `/careers/`
19. **Contact**: `/contact/`

---

## 5. Aesthetic & Design System

- **Brand Primary Blue:** `#166fb0`
- **Brand Dark Navy:** `#0b1f33`
- **Brand Sub-header Blue:** `#0f5487`
- **Typography:** Rubik (Headings) + Open Sans (Body copy)
- **Responsive Layout:** 100% fluid layouts with zero horizontal scrollbar overflow.
- **Micro-interactions:** Card lift effects, subtle shadow elevations, and smooth accordion transitions.

---

## 6. Testing & Quality Assurance

- **Unit Tests:** 33 test suites checking all 19 route components, header navigation, mobile drawer toggle, footer details, site data integrity, and interactive form submissions.
- **Stress Unit Tests:** `npm run test:unit:stress` runs 25 iterations (825 test assertions).
- **Playwright E2E Tests:** Tests all 19 pages on Desktop (1440x900) and Mobile (390x844).
  - Verifies presence of H1 headings.
  - Verifies `scrollWidth <= innerWidth` (zero horizontal overflow).
  - Verifies zero broken images (`naturalWidth > 0`).
  - Verifies zero console errors or uncaught JavaScript exceptions.
  - Verifies full chain navigation across case studies and interactive form submissions.
- **Repeat Stress Runs:** `npm run test:pages:stress` and `npm run test:e2e:stress` run 100+ passes.

---

## 7. Build and Dev Commands

```bash
# Start local development server (port 3001)
npm run dev

# Run TypeScript compiler check
npm run lint

# Build production bundle
npm run build

# Run unit tests
npm test

# Run 25x unit stress test (825 assertions)
npm run test:unit:stress

# Run Playwright E2E tests (Desktop & Mobile)
npm run test:e2e

# Run 100+ repeat stress tests
npm run test:pages:stress

# Run complete verification (lint + test + e2e)
npm run verify
```
