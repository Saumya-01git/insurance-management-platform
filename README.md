# InsurePulse Enterprise Insurance Management Platform 🛡️💼

> **Production-Ready Enterprise Insurance Carrier Suite** (Guidewire / Duck Creek / Salesforce Financial Services Cloud Standard).

InsurePulse is a full-stack, enterprise-grade Insurance Carrier Management Platform built for high-throughput insurance underwriting, claims processing, premium settlements, encrypted document vault management, and real-time executive analytics.

---

## 🔑 Demo Access Credentials (1-Click Login Available)

| Role Portal | User Name | Email Address | Password | Target Access |
| :--- | :--- | :--- | :--- | :--- |
| ⚡ **ADMIN** | **Saumya** | `saumya@admin.com` | `SaumyaPass2026!` *(or saumya123)* | Full Omni-Channel Admin Suite (`/dashboard`) |
| 👔 **AGENT** | **Sonam** | `sonam@agent.com` | `SonamPass2026!` *(or sonam123)* | Underwriting Agent Suite (`/dashboard`) |
| 👤 **CUSTOMER** | **Naira** | `naira@gmail.com` | `NairaPass2026!` *(or naira123)* | Policyholder Self-Service Portal (`/customer-dashboard`) |

---

## 🌟 Key Modules & Capabilities

### 1. 🛡️ Underwriting & Policy Center (`/policies`)
- Complete policy lifecycle management (*Active*, *Pending Underwriting*, *Expiring Soon*, *Expired*).
- Issue policies, edit coverage terms, renew active agreements, and calculate annual premiums.
- Instant CSV portfolio exports and standard `%PDF-1.4` binary policy certificate generation.

### 2. 📋 Claims Processing Center (`/claims`)
- Loss filing registration, adjuster assignment, and loss documentation audits.
- Real-time approval workflows (*Approved Payouts*, *Under Review*, *Rejected*).
- Audit trail event timelines for legal compliance.

### 3. 💳 Premium Billing & Payment Operations (`/payments`)
- ACH Wire & Credit Card premium settlement tracking.
- Instant downloadable official receipt vouchers (`Payment_Receipt_PAY-8801.csv`).
- Comprehensive accounting ledger CSV exports.

### 4. 👤 Customer 360° Directory (`/customers`)
- Policyholder profiles with identity verification (KYC status).
- Linked active policy counts, cumulative premiums, and contact details.

### 5. 🔒 Encrypted Documents Vault (`/documents`)
- AES-256 Bit encrypted storage for KYC passports, property safety certificates, and claim evidence.
- Multi-file upload form, category filters, 256-bit SSL preview modal, and direct PDF downloads.

### 6. 📊 Executive Reports & Analytics (`/reports`)
- Real-time gross revenue trends, monthly policy volume, claims payout ratios, and customer growth charts.
- Export PDF, Export CSV, and Print reporting capabilities.

### 7. 🎧 Multi-Role Support Ticket Desk (`/tickets`)
- Customer-to-Agent ticket routing with real-time response threads and status tracking.

### 8. ⚙️ System Settings & Security (`/settings`)
- Underwriter profile configuration, company NAIC codes, notification preferences, password updates, theme mode toggle, and system diagnostics.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Styling & Design System** | Tailwind CSS, Lucide React |
| **Data Visualization** | Recharts |
| **HTTP Client & Async** | Axios, Custom React Hooks |
| **Backend Runtime** | Node.js, Express REST API |
| **Database ORM** | Prisma ORM, PostgreSQL |
| **Authentication** | JWT (JSON Web Tokens), BCrypt Password Hashing |
| **Security & Utilities** | Helmet, CORS, Rate Limiter, Multer, Swagger UI |

---

## 📁 Repository Architecture & Folder Structure

```
insurance-management-platform/
├── server/                      # Node.js + Express + Prisma REST API
│   ├── prisma/                  # Prisma Schema & Database Migrations
│   ├── controllers/             # Policy, Claim, Payment, Customer Controllers
│   ├── middleware/              # JWT Auth & Role-Based Access Control (RBAC)
│   ├── routes/                  # REST API Express Router
│   └── server.js                # Server Entrypoint
└── client/                      # Vite + React Frontend Application
    ├── src/
    │   ├── api/                 # Axios HTTP API Connectors
    │   ├── components/          # Reusable UI Components
    │   │   ├── common/          # ErrorBoundary, Toast, Skeleton
    │   │   ├── customers/       # Customer Tables & Cards
    │   │   ├── policies/        # Policy Modals, Tables, Cards
    │   │   ├── claims/          # Claims Status Badges & Timelines
    │   │   ├── payments/        # Payment Receipts & Tables
    │   │   ├── documents/       # File Uploader, Preview Modal
    │   │   ├── reports/         # Analytics Charts & KPI Stats
    │   │   └── settings/        # Profile, Company, Security Settings
    │   ├── context/             # AuthContext, ThemeContext
    │   ├── hooks/               # Custom React Hooks
    │   ├── pages/               # Page Views (/policies, /claims, /payments, /common)
    │   ├── routes/              # Protected Router & Error Boundary
    │   ├── services/            # API Services with Local Fallbacks
    │   └── utils/               # CSV Exporters & PDF Generators
    └── package.json
```

---

## ⚡ Local Installation & Development Setup

### 1. Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### 2. Clone Repository
```bash
git clone https://github.com/Saumya-01git/insurance-management-platform.git
cd insurance-management-platform
```

### 3. Backend Setup
```bash
cd server
npm install
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

## 🚀 Deployment Guide

- **Frontend (Vercel)**:
  1. Connect GitHub repo to Vercel.
  2. Set Root Directory to `client`.
  3. Environment Variable: `VITE_API_BASE_URL=https://your-backend.onrender.com/api`

- **Backend (Render)**:
  1. Connect GitHub repo to Render Web Service.
  2. Set Root Directory to `server`.
  3. Environment Variables: `DATABASE_URL`, `JWT_SECRET`, `PORT=5000`.

---

## 📜 License & Compliance

Developed for Enterprise Carrier Operations. Built under standard MIT license.
