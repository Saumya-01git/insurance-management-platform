# InsurePulse – Enterprise Insurance Management Platform 🛡️💼

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Full-Stack Enterprise Insurance Infrastructure** built to industry standards (Guidewire / Duck Creek / Salesforce Financial Services Cloud). Designed for high-throughput insurance underwriting, multi-portal policy management, claims processing, premium billing ledgers, encrypted document vaults, and executive analytics.

---

## 🔗 Live Deployment & Documentation

| Portal / Document | Link | Status |
| :--- | :--- | :---: |
| 🌐 **Live Web Application** | [https://insurance-management-platform-blush.vercel.app](https://insurance-management-platform-blush.vercel.app) | ![Vercel](https://img.shields.io/badge/Vercel-LIVE-success?style=flat-square&logo=vercel) |
| ⚙️ **Backend REST API** | [https://insurepulse-api.onrender.com/api](https://insurepulse-api.onrender.com/api) | ![Render](https://img.shields.io/badge/Render-ACTIVE-success?style=flat-square&logo=render) |
| 📚 **Interactive Swagger API Docs** | [https://insurepulse-api.onrender.com/api-docs](https://insurepulse-api.onrender.com/api-docs) | ![Swagger](https://img.shields.io/badge/Swagger-ONLINE-85EA2D?style=flat-square&logo=swagger&logoColor=black) |
| 💻 **GitHub Source Repository** | [https://github.com/Saumya-01git/insurance-management-platform](https://github.com/Saumya-01git/insurance-management-platform) | ![GitHub](https://img.shields.io/badge/GitHub-Main-181717?style=flat-square&logo=github) |

---

## 🔑 Demo Access Credentials (1-Click Login Enabled)

Try all 3 isolated role-based portals directly on the sign-in page using 1-click preset cards:

| Role Portal | Full Name | Email Address | Secure Password | Portal Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| ⚡ **ADMIN** | **Saumya** | `saumya@admin.com` | `SaumyaPass2026!` *(or saumya123)* | Full Omni-Channel Admin Suite (`/dashboard`) |
| 👔 **AGENT** | **Sonam** | `sonam@agent.com` | `SonamPass2026!` *(or sonam123)* | Underwriting Risk & Claims Desk (`/dashboard`) |
| 👤 **CUSTOMER** | **Naira** | `naira@gmail.com` | `NairaPass2026!` *(or naira123)* | Policyholder Self-Service Portal (`/customer-dashboard`) |

> 🔒 **Role Security (RBAC) Guard**: If a user registered as `CUSTOMER` attempts to sign in under the Admin portal, the system immediately blocks access and displays a 403 Access Denied alert.

---

## 🌟 Key Modules & Business Features

### 1. 🛡️ Underwriting & Policy Lifecycle (`/policies`)
- Complete policy management across Commercial Property, Health Care Shield, Fleet Auto, and Executive Disability.
- Status management (*Active*, *Pending Underwriting*, *Expiring Soon*, *Expired*).
- Instant standard **`%PDF-1.4` binary policy certificate generation** readable in Adobe Acrobat, Chrome, and Edge.
- CSV policy portfolio exporting and underwriting risk analytics.

### 2. 📋 Claims Processing & Loss Audits (`/claims`)
- Policyholder loss claim registration with incident narratives, evidence attachments, and payout requests.
- Real-time claims assessment workflows (*Pending*, *Under Review*, *Approved Payouts*, *Rejected*).
- Audit trail event logs for regulatory compliance.

### 3. 💳 Billing Ledger & Settlements (`/payments`)
- ACH Wire & Credit Card premium settlement logs.
- Automatic calculation of paid vs. pending balances.
- Downloadable official transaction receipts (`Payment_Receipt_PAY-8801.csv`).

### 4. 👤 Customer 360° Directory (`/customers`)
- Policyholder directory with identity verification status (KYC verified).
- Linked active policy counts, cumulative premiums, and contact details.

### 5. 🔒 Encrypted Documents Vault (`/documents`)
- AES-256 Bit encrypted storage for KYC passports, property valuation certificates, and claim proof documents.
- Multi-type upload modal with file category classification.
- **256-Bit SSL Compliance Preview Popup** and direct binary PDF downloads.

### 6. 📊 Executive Reports & Business Intelligence (`/reports`)
- Real-time gross revenue trends, monthly policy issuance rates, claims payout ratios, and customer growth charts.
- Powered by Recharts with multi-format CSV/PDF export tools.

### 7. 🎧 Multi-Role Support Ticket Queue (`/tickets`)
- Customer-to-Agent support ticket routing with real-time response threads and status tracking (`In Progress`, `Resolved`).

### 8. ⚙️ System Settings & Security (`/settings`)
- Underwriter profiles, company NAIC registration codes, security rules, notification settings, and Dark/Light mode theme toggle.

---

## 🏛️ System Architecture

```mermaid
graph TD
    subgraph Client ["Frontend Layer (React 18 + Vite)"]
        CP[Customer Portal - Naira]
        AS[Agent Suite - Sonam]
        AD[Admin Platform - Saumya]
      ThemeContext[Theme & Layout Manager]
    end

    subgraph Security ["Security & Governance Layer"]
        RBAC[Role-Based Access Control]
        JWT[JWT Bearer Token Guard]
        Helmet[Helmet Security Headers]
        RateLimiter[Express Rate Limiter]
    end

    subgraph API ["REST API Services (Node.js + Express)"]
        AuthService["/api/auth"]
        CustService["/api/customers"]
        PolService["/api/policies"]
        ClaimService["/api/claims"]
        PayService["/api/payments"]
        DocService["/api/documents"]
        TktService["/api/tickets"]
        Swagger["/api-docs Swagger OpenAPI"]
    end

    subgraph Data ["Cloud Database & Storage"]
        Prisma[Prisma ORM]
        CloudDB[(Neon AWS Cloud PostgreSQL)]
        PDFEngine[Native Binary PDF 1.4 Generator]
    end

    CP --> RBAC
    AS --> RBAC
    AD --> RBAC
    RBAC --> JWT
    JWT --> Helmet
    Helmet --> RateLimiter
    RateLimiter --> API
    API --> Prisma
    Prisma --> CloudDB
    API --> PDFEngine
```

---

## 🛠️ Technology Stack Breakdown

| Module | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18, Vite, React Router v7 |
| **Styling & Icons** | Tailwind CSS, Lucide React, Framer Motion |
| **Forms & Validation** | React Hook Form, Custom Password Strength Regex |
| **Data Visualization** | Recharts (Area Charts, Bar Charts, Donut Charts) |
| **HTTP & Async Data** | Axios, Custom React Hooks, Interceptors |
| **Backend Framework** | Node.js, Express.js REST API |
| **ORM & Database** | Prisma ORM, Managed AWS Cloud PostgreSQL (Neon.tech) |
| **Authentication & Security** | JWT (JSON Web Tokens), BCrypt, Helmet, CORS, Rate Limiter |
| **File Handling & Docs** | Multer, Swagger UI Express, Native PDF 1.4 Binary Generator |

---

## 📁 Enterprise Repository Structure

```
insurance-management-platform/
├── server/                      # Express REST API & Prisma Backend
│   ├── prisma/                  # Prisma Database Schema & Migrations
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/              # Prisma & Swagger OpenAPI Configurations
│   │   ├── controllers/         # Auth, Customer, Policy, Claim, Payment, Document, Ticket Controllers
│   │   ├── middleware/          # JWT Auth, RBAC Role Guard, Validation, Multer, Error Handler
│   │   ├── routes/              # Express REST API Route Modules
│   │   ├── utils/               # Token Generator & PDF Blob Stream Helper
│   │   ├── app.js               # Express Application Assembly
│   │   └── server.js            # Node.js Server Port Listener Entrypoint
│   ├── package.json
│   └── .env
└── client/                      # Vite + React Frontend Application
    ├── src/
    │   ├── api/                 # Axios HTTP Instance & Endpoints
    │   ├── components/          # Modular UI Components
    │   │   ├── common/          # ErrorBoundary, Toast, Skeleton Loader, Support Modal
    │   │   ├── layout/          # Executive Navy Sidebar, Header Navbar, Auth/Dashboard Layouts
    │   │   ├── customers/       # Customer Grid & Table Views
    │   │   ├── policies/        # Underwriting Modals & Certificate Cards
    │   │   ├── claims/          # Claims Assessment & Loss Evidence Attachment
    │   │   ├── payments/        # Settlement Ledger & CSV Exporters
    │   │   ├── documents/       # Drag & Drop Uploader, SSL Preview Popup
    │   │   ├── reports/         # Analytics BI Charts & Performance Cards
    │   │   └── settings/        # Profile, Security, and System Settings
    │   ├── context/             # AuthContext (RBAC state) & ThemeContext (Dark/Light mode)
    │   ├── hooks/               # Custom Data Hooks (usePolicies, useClaims, useCustomers)
    │   ├── pages/               # Multi-Portal Page Views & Common Error Pages (404, 403, 500)
    │   ├── routes/              # Protected Router & Role Access Guards
    │   ├── services/            # REST API Connectors with Resilient Fallback Engine
    │   └── utils/               # PDF 1.4 Certificate Streamer & CSV Exporters
    ├── index.html
    └── package.json
```

---

## 📸 Screenshots & Portal Previews

<div align="center">
  <img src="https://via.placeholder.com/800x450/0C1424/ffffff?text=InsurePulse+Admin+Executive+Dashboard" alt="Admin Executive Dashboard" width="90%" />
  <p><em>Figure 1: Omni-Channel Admin Executive Analytics & Operational Audit Log</em></p>

  <br />

  <img src="https://via.placeholder.com/800x450/0C1424/10B981?text=Policyholder+Customer+Portal+-+Naira" alt="Customer Portal" width="90%" />
  <p><em>Figure 2: Customer Self-Service Portal & Loss Claims Center (Naira)</em></p>

  <br />

  <img src="https://via.placeholder.com/800x450/0C1424/2563EB?text=Encrypted+Document+Vault+%26+PDF+Generator" alt="Document Vault" width="90%" />
  <p><em>Figure 3: Encrypted Document Vault with 256-Bit SSL Preview Popup & PDF Certificates</em></p>
</div>

---

## ⚡ Local Installation & Development Setup

### 1. Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **PostgreSQL**: `v14.x` or higher (Optional if using cloud database)

### 2. Clone Repository
```bash
git clone https://github.com/Saumya-01git/insurance-management-platform.git
cd insurance-management-platform
```

### 3. Backend Setup
```bash
cd server
npm install
```

Configure `server/.env`:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET="insurance_management_platform_2026_secret_key"
DATABASE_URL="postgresql://user:password@localhost:5432/insurance_management"
```

Sync database schema & start server:
```bash
npx prisma db push
npm run dev
```
*Backend server runs at `http://localhost:5000` (Swagger docs at `/api-docs`)*

### 4. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
*Frontend app runs at `http://localhost:5173`*

---

## 🔌 REST API Endpoints Overview

| Category | Method | Endpoint | Description | Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register new account with role | Public |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| **Customers**| `GET` | `/api/customers` | Fetch customer directory | Admin, Agent |
| **Policies** | `GET` | `/api/policies` | Fetch underwritten policy list | Admin, Agent, Customer |
| **Policies** | `POST` | `/api/policies` | Underwrite new policy agreement | Admin, Agent |
| **Claims** | `GET` | `/api/claims` | Fetch all loss claims | Admin, Agent, Customer |
| **Claims** | `POST` | `/api/claims` | Submit new loss claim with proof | Admin, Agent, Customer |
| **Payments** | `GET` | `/api/payments` | Fetch premium settlement ledger | Admin, Agent, Customer |
| **Documents**| `POST` | `/api/documents/upload` | Upload proof document to vault | Admin, Agent, Customer |
| **Tickets** | `GET` | `/api/tickets` | Fetch support ticket queue | Admin, Agent, Customer |
| **Tickets** | `POST` | `/api/tickets/:id/reply` | Reply to support ticket thread | Admin, Agent |

---

## 🔮 Future Enhancements & Roadmap

- [ ] **AI-Powered Loss Assessment**: Integrate OpenAI Vision API for automated vehicle damage estimation from uploaded claim images.
- [ ] **Stripe Payment Gateway Integration**: Real-time credit card processing for instant online premium billing.
- [ ] **Twilio SMS Alerts**: Instant SMS notifications for claim status updates and policy renewal reminders.
- [ ] **Multi-Tenant Enterprise Support**: Allow multiple insurance carrier companies to manage independent tenant databases.

---

## 👨‍💻 Author & Engineering Credits

**Saumya**  
- **GitHub**: [@Saumya-01git](https://github.com/Saumya-01git)  
- **Project**: InsurePulse Enterprise Platform  
- **Role**: Full-Stack Software Engineer  

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Built for enterprise insurance carrier operations.
