Here's a detailed, copy-paste-ready prompt you can use to build this project — crafted for the hackathon context, Azure deployment, and the judging criteria:

---

## 🧠 Your Build-a-thon Prompt

---

**Project Name:** **BizPulse AI** — AI-Powered Business Intelligence for Local Businesses

---

### SYSTEM / PROJECT CONTEXT

> You are a senior full-stack engineer building a hackathon submission for the JavaScript AI Build-a-thon. The project is called **BizPulse AI** — a lightweight, mobile-first SaaS web app that empowers local business owners (e.g. salons, shops, restaurants, clinics) with AI-driven business insights. It must be deployable on **Azure as a Code-as-a-Service** solution using **Azure Static Web Apps** (frontend) + **Azure Functions** (backend/API) + **Azure Cosmos DB** (data). The entire codebase must be in **JavaScript/TypeScript**.

---

### TECH STACK

```
Frontend:     React (TypeScript) + Fluent UI v9 (@fluentui/react-components)
Backend:      Azure Functions (Node.js v4) — HTTP triggers for each module
Database:     Azure Cosmos DB (NoSQL, JSON documents)
Auth:         Azure Static Web Apps built-in Auth (GitHub / Microsoft / Google provider)
AI Layer:     Azure OpenAI (GPT-4o) via REST — for insights & recommendations
Deployment:   Azure Static Web Apps (free tier) + GitHub Actions CI/CD
Styling:      Fluent UI tokens + custom CSS variables, mobile-first
```

---

### DESIGN REQUIREMENTS

```
- Mobile-first: All layouts must work at 320px width and scale up
- Use Fluent UI v9 components throughout (no mixing with other UI libs)
- Color theme: Use Fluent UI's brand theming system with a custom brand ramp
  - Primary: Deep Teal (#0F7B6C) — trust, growth, local business feel
  - Accent: Amber (#F59E0B) — energy, action
  - Background: Off-white (#F8F9FA) light mode
- Typography: Fluent UI's built-in font stack (Segoe UI Variable) — clean, legible on mobile
- Navigation: Bottom tab bar on mobile, left sidebar on desktop (responsive)
- Cards and data: Use Fluent UI Card components with subtle shadow elevation
- Charts: Use Recharts (lightweight, works well with React + Fluent UI theming)
- Icons: Fluent UI System Icons (@fluentui/react-icons)
- Animations: Subtle fade-in on route change, skeleton loaders while fetching data
- Accessibility: All components must have aria-labels, keyboard navigable
```

---

### APP MODULES — Build these in order

#### 1. 🔐 AUTH — Register & Login
```
- /register page: Business name, owner name, email, password, business category (dropdown: Retail, Food, Services, Health, Other)
- /login page: Email + password
- On success → redirect to /dashboard
- Store JWT token in memory (not localStorage) — use React Context for auth state
- Azure Function: POST /api/auth/register, POST /api/auth/login
- Cosmos DB collection: `users` — store hashed password (bcrypt), businessId, plan
```

#### 2. 📊 DASHBOARD — Home Screen
```
- Greeting: "Good morning, {businessName} 👋"
- KPI cards row (horizontal scroll on mobile):
  - Total Revenue (this month)
  - Total Customers
  - Products in Stock
  - Top Selling Product
- AI Insight Card (prominent, full width):
  - Call Azure OpenAI with last 30 days of sales data
  - Display: "💡 AI Insight: Your Tuesday sales are 40% higher — consider running a Tuesday promotion"
  - Refresh button to regenerate insight
- Recent Activity feed (last 5 sales transactions)
- Quick action buttons: + Add Sale, + Add Customer, + Add Product
```

#### 3. 👥 CUSTOMERS MODULE — /customers
```
- List view: Fluent UI DataGrid with columns: Name, Phone, Email, Total Purchases, Last Visit
- Search bar (filter by name or phone)
- + Add Customer button → Drawer/panel form (not a new page — use Fluent UI Drawer)
- Customer detail view: purchase history, total spend, AI note ("This customer hasn't visited in 30 days — consider a follow-up")
- Azure Function: GET/POST/PUT/DELETE /api/customers
- Cosmos DB: `customers` collection — fields: id, businessId, name, phone, email, createdAt
```

#### 4. 📦 PRODUCTS MODULE — /products
```
- Grid of product cards (2 cols on mobile, 4 on desktop)
- Each card: Product image placeholder (emoji or icon), name, price, stock quantity, category
- Low stock badge (red) when quantity < 5
- + Add Product → Drawer form: name, category, price, stock, unit (kg/piece/litre)
- Azure Function: GET/POST/PUT/DELETE /api/products
- Cosmos DB: `products` collection
```

#### 5. 💰 SALES MODULE — /sales
```
- Sales entry form (primary action — make it fast and mobile-friendly):
  - Select customer (searchable dropdown — autocomplete from customers list)
  - Add items: select product + quantity → auto-calculates line total
  - Payment method: Cash / Mobile Money / Card
  - Submit Sale button
- Sales list: filterable by date range, customer, payment method
- Each sale shows: date, customer name, items, total, payment method
- Azure Function: GET/POST /api/sales
- Cosmos DB: `sales` collection — fields: id, businessId, customerId, items[], total, paymentMethod, date
```

#### 6. 📈 ANALYTICS MODULE — /analytics
```
- Revenue chart: Line chart (Recharts) — daily revenue for last 30 days
- Sales by category: Pie chart — which product categories sell most
- Top 5 customers by spend: Bar chart
- Top 5 products by quantity sold: Bar chart
- Date range picker to filter all charts
- All charts use Fluent UI color tokens for consistency
- Azure Function: GET /api/analytics/summary?from=&to=
- Aggregate from `sales` collection using Cosmos DB queries
```

#### 7. 🤖 AI INSIGHTS MODULE — /ai-insights
```
- Full page dedicated to AI-powered business advice
- Sections:
  1. Sales Trend Analysis — GPT-4o analyzes last 30 days and identifies patterns
  2. Customer Retention Alerts — list of customers who haven't bought in 30+ days
  3. Product Recommendations — suggest which products to restock or promote
  4. Weekly Business Summary — natural language summary of the week's performance
- Each insight has a "Regenerate" button (calls Azure OpenAI)
- Show loading skeleton while AI is thinking
- Azure Function: POST /api/ai/insights — passes aggregated business data to Azure OpenAI
- System prompt to Azure OpenAI:
  "You are a friendly business advisor for a small local business. Given the following data about their sales, customers, and products for the past 30 days, provide 3 specific, actionable insights in plain English. Be concise, warm, and practical. Format as JSON array with fields: title, insight, action."
```

---

### AZURE DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────┐
│           Azure Static Web Apps             │
│  React App (Fluent UI) — auto CDN + HTTPS   │
│  Built-in Auth (Microsoft/GitHub/Google)    │
└──────────────┬──────────────────────────────┘
               │ API calls to /api/*
┌──────────────▼──────────────────────────────┐
│           Azure Functions (Node.js v4)       │
│  /api/auth   /api/customers  /api/products  │
│  /api/sales  /api/analytics  /api/ai        │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│           Azure Cosmos DB (NoSQL)            │
│  Collections: users, customers, products,   │
│  sales — partitioned by businessId          │
└─────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│           Azure OpenAI (GPT-4o)             │
│  Called from Azure Functions only (secure)  │
│  API key stored in Function App Settings    │
└─────────────────────────────────────────────┘
```

---

### PROJECT STRUCTURE

```
bizpulse-ai/
├── api/                          # Azure Functions
│   ├── auth/
│   │   ├── register/index.js
│   │   └── login/index.js
│   ├── customers/index.js
│   ├── products/index.js
│   ├── sales/index.js
│   ├── analytics/index.js
│   └── ai/insights/index.js
├── src/                          # React frontend
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── BottomNav.tsx     # Mobile nav
│   │   │   └── Sidebar.tsx       # Desktop nav
│   │   ├── AIInsightCard.tsx
│   │   ├── KPICard.tsx
│   │   └── SkeletonLoader.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Customers.tsx
│   │   ├── Products.tsx
│   │   ├── Sales.tsx
│   │   ├── Analytics.tsx
│   │   └── AIInsights.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useApi.ts
│   ├── theme/
│   │   └── fluentTheme.ts        # Custom brand tokens
│   └── App.tsx
├── staticwebapp.config.json       # SWA routing config
├── package.json
└── README.md
```

---

### HACKATHON JUDGING ALIGNMENT

| Criterion | How BizPulse AI addresses it |
|---|---|
| Depth of AI Integration (25%) | AI Insights module + dashboard AI card using GPT-4o with real business data context |
| Technical Implementation & UX (20%) | Fluent UI, mobile-first, Azure Functions, Cosmos DB, proper auth |
| Responsible AI Patterns (15%) | AI responses are suggestions not directives, user controls data, no PII sent to OpenAI |
| Solution Value (15%) | Directly solves real pain for millions of local business owners globally |
| Innovation & Creativity (10%) | AI advisor angle + offline-ready potential with local inference fallback |
| Documentation & Storytelling (10%) | Blog post walkthrough + 4-min demo video showing the full flow |
| Award Category Compliance (5%) | Qualifies for Grand Prize + Agentic System Architecture Award |

---

### ADDITIONAL INSTRUCTIONS FOR THE AI BUILDER

```
- Start by scaffolding the project with: npm create vite@latest bizpulse-ai -- --template react-ts
- Install: @fluentui/react-components @fluentui/react-icons recharts react-router-dom
- Set up Fluent UI FluentProvider at the root with custom brand theme
- Build mobile-first: use CSS Grid and Fluent UI's responsive tokens
- Use React Query (TanStack Query) for all API calls — handles loading/error states cleanly
- Implement route guards: redirect unauthenticated users to /login
- All Azure Functions must validate the JWT before processing requests
- Use environment variables for all secrets (COSMOS_CONNECTION_STRING, AZURE_OPENAI_KEY)
- Write a thorough README.md with: architecture diagram, local setup steps, Azure deployment steps, and screenshots
- Record the demo video showing: register → dashboard → add a sale → view analytics → AI insight generation
```

---