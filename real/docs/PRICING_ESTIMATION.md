# IVIS Property Listings — Pricing & Budget Estimation

**Version:** 3.0
**Date:** February 2026
**Market:** Kingdom of Bahrain
**Target:** 50–100 Concurrent Users, Production Deployment
**Currency:** Bahraini Dinar (BHD) and USD ($) — 1 BHD ≈ $2.65

---

## Table of Contents

1. [Commercial Pricing Models](#1-commercial-pricing-models)
   - [Pricing Overview](#11-pricing-overview)
   - [Model 1: One-Time License](#12-model-1-one-time-license)
   - [Model 2: Monthly Subscription (SaaS)](#13-model-2-monthly-subscription-saas)
   - [Model 3: Per-Agent Pricing](#14-model-3-per-agent-pricing)
   - [Model 4: Usage-Based Pricing](#15-model-4-usage-based-pricing)
   - [Three-Year Total Cost of Ownership](#16-three-year-total-cost-of-ownership)
   - [Model Recommendation](#17-model-recommendation)
2. [Budget Summary](#2-budget-summary)
3. [Infrastructure Costs](#3-infrastructure-costs)
4. [WhatsApp Business API Costs](#4-whatsapp-business-api-costs)
5. [AI / API Costs](#5-ai--api-costs)
6. [Third-Party Services](#6-third-party-services)
7. [Development Costs](#7-development-costs)
8. [Operational Costs](#8-operational-costs)
9. [One-Time Setup Costs](#9-one-time-setup-costs)
10. [Monthly Recurring Costs — Micro Split](#10-monthly-recurring-costs--micro-split)
11. [Annual Budget Projection](#11-annual-budget-projection)
12. [Cost Optimization Strategies](#12-cost-optimization-strategies)
13. [Budget by Phase](#13-budget-by-phase)

---

## 1. Commercial Pricing Models

### 1.1 Pricing Overview

The IVIS Property Listings platform can be offered under **four pricing models** depending on the client's preference for upfront investment, operational involvement, and cost predictability.

| Model | How You Pay | Best For |
|-------|-------------|----------|
| **One-Time License** | Large upfront + small recurring | Clients who want ownership and lowest long-term cost |
| **Monthly Subscription** | Fixed monthly fee, no large upfront | Clients who want predictable costs and zero operational burden |
| **Per-Agent** | Base fee + per user/agent | Brokerages scaling their team, pay proportional to size |
| **Usage-Based** | Base fee + pay per transaction | High-variability businesses, seasonal operations |

---

### 1.2 Model 1: One-Time License

#### Option A — Software Delivery (Client-Hosted, Without Infrastructure)

The client pays a one-time fee for the complete platform. IVIS delivers the source code, documentation, and deployment guide. The client manages their own hosting, API subscriptions, and ongoing operations.

**One-Time Fee: BHD 6,250 ($16,563)**

| Deliverable | Included |
|-------------|----------|
| Backend (Express.js + PostgreSQL + APIs) | Yes |
| Frontend (React SPA + Admin Dashboard) | Yes |
| WhatsApp Business API Integration | Yes |
| AI Chatbot Engine (NLU + Auto-Screening) | Yes |
| Arabic NLU (Gulf Dialect) | Yes |
| Docker Containers + CI/CD Pipeline | Yes |
| Complete Source Code | Yes |
| Technical Documentation | Yes |
| Deployment Guide | Yes |
| Training & Knowledge Transfer (2 sessions) | Yes |
| Infrastructure Provisioning | No |
| Managed Hosting | No |
| Ongoing Maintenance | No |

**Client's Ongoing Monthly Costs (Self-Managed):**

| Item | Option A (Budget) | Option B (Recommended) | Option C (AWS Bahrain) |
|------|-------------------|----------------------|-------------------------------|
| Hosting (VPS / Cloud) | BHD 10 ($27) | BHD 36 ($95) | BHD 58 ($154) |
| WhatsApp Business API | BHD 19 ($50) | BHD 19 ($50) | BHD 19 ($50) |
| AI API Subscription | BHD 13 ($34) | BHD 13 ($34) | BHD 13 ($34) |
| Third-Party Services | BHD 6 ($16) | BHD 9 ($24) | BHD 6 ($16) |
| **Total (client manages)** | **BHD 48 ($127)** | **BHD 77 ($204)** | **BHD 96 ($254)** |

**Optional Annual Maintenance Contract (AMC):**

| AMC Tier | What's Included | Hours/Month | BHD/Month | $/Month |
|----------|----------------|-------------|-----------|---------|
| Basic | Security patches, critical bug fixes | 2 | BHD 40 | $106 |
| Standard | Above + bug fixes, WhatsApp template mgmt, monitoring | 6 | BHD 115 | $305 |
| Premium | Above + feature improvements, priority support, performance tuning | 12 | BHD 225 | $596 |

**Year 1 Totals (Option B Infrastructure):**

| Configuration | Year 1 (BHD) | Year 1 ($) |
|---------------|-------------|-----------|
| Without AMC | BHD 7,174 | $19,011 |
| With Basic AMC | BHD 7,654 | $20,283 |
| With Standard AMC | BHD 8,554 | $22,668 |
| With Premium AMC | BHD 8,874 | $23,516 |

**Year 2 Totals (Option B Infrastructure):**

| Configuration | Year 2 (BHD) | Year 2 ($) |
|---------------|-------------|-----------|
| Without AMC | BHD 924 | $2,449 |
| With Basic AMC | BHD 1,404 | $3,721 |
| With Standard AMC | BHD 2,304 | $6,106 |
| With Premium AMC | BHD 3,624 | $9,604 |

---

#### Option B — Turnkey Package (IVIS-Managed, With Infrastructure)

IVIS delivers the complete platform AND manages all infrastructure, hosting, APIs, and operations for the first 12 months. The client receives a fully running production system with zero operational burden.

**One-Time Fee: BHD 9,750 ($25,838)**

| Deliverable | Included |
|-------------|----------|
| Everything in Option A | Yes |
| Infrastructure Provisioning & Hardening | Yes |
| Server Setup (Option B Multi-Server) | Yes |
| Database Configuration + Replication | Yes |
| SSL, Firewall, Security Hardening | Yes |
| 12-Month Managed Hosting | Yes |
| 12-Month WhatsApp API Subscription | Yes |
| 12-Month AI API Subscription | Yes |
| 12-Month Engineering Operations (11 hrs/mo) | Yes |
| 12-Month Monitoring & Alerting | Yes |
| 12-Month Human Agent Exception Review (4 hrs/mo) | Yes |
| Go-Live Support | Yes |

**Year 2 Renewal (Managed Operations):**

| Component | Monthly (BHD) | Annual (BHD) | Annual ($) |
|-----------|--------------|-------------|-----------|
| Infrastructure (Option B) | BHD 36 | BHD 432 | $1,145 |
| WhatsApp Business API | BHD 19 | BHD 228 | $604 |
| AI API | BHD 13 | BHD 156 | $413 |
| Third-Party Services | BHD 9 | BHD 108 | $286 |
| Engineering Operations (11 hrs) | BHD 113 | BHD 1,356 | $3,593 |
| Human Agent (4 hrs) | BHD 32 | BHD 384 | $1,018 |
| **Total Year 2** | **BHD 222/mo** | **BHD 2,664** | **$7,060** |

**Summary:**

| Period | BHD | $ |
|--------|-----|---|
| **Year 1 (all-inclusive)** | **BHD 9,750** | **$25,838** |
| **Year 2 (renewal)** | **BHD 2,664** | **$7,060** |
| **Year 3 (renewal)** | **BHD 2,664** | **$7,060** |

---

### 1.3 Model 2: Monthly Subscription (SaaS)

No large upfront investment. The client pays a fixed monthly fee that covers everything — platform, hosting, APIs, maintenance, and support. IVIS manages all operations.

**Setup Fee: BHD 1,500 ($3,975)** — one-time onboarding, customization, branding, data migration.

| Plan | Agents | Monthly (BHD) | Monthly ($) | Annual (BHD) | Annual ($) |
|------|--------|--------------|-------------|-------------|-----------|
| **Starter** | Up to 5 | BHD 500 | $1,325 | BHD 6,000 | $15,900 |
| **Professional** | Up to 15 | BHD 750 | $1,988 | BHD 9,000 | $23,850 |
| **Enterprise** | Unlimited | BHD 1,200 | $3,180 | BHD 14,400 | $38,160 |

**Minimum commitment:** 12 months.

**What's Included in All Plans:**

| Feature | Starter | Professional | Enterprise |
|---------|---------|-------------|-----------|
| WhatsApp AI Chatbot | Yes | Yes | Yes |
| Property Listing Management | Yes | Yes | Yes |
| AI Auto-Screening | Yes | Yes | Yes |
| Arabic NLU (Gulf Dialect) | Yes | Yes | Yes |
| Admin Dashboard | Yes | Yes | Yes |
| Managed Hosting | Option A (Single VPS) | Option B (Multi-Server) | Option C (AWS Bahrain) |
| WhatsApp API Included | Yes | Yes | Yes |
| AI API Included | 500 req/day | 1,000 req/day | Unlimited |
| Engineering Support | 4 hrs/mo | 8 hrs/mo | 16 hrs/mo |
| Uptime SLA | 99.5% | 99.9% | 99.9% |
| Custom Branding | No | Yes | Yes |
| Priority Support | No | No | Yes |
| Source Code Access | No | No | Negotiable |

**Year 1 Totals:**

| Plan | Year 1 (BHD) | Year 1 ($) |
|------|-------------|-----------|
| Starter | BHD 7,500 | $19,875 |
| Professional | BHD 10,500 | $27,825 |
| Enterprise | BHD 15,900 | $42,135 |

**Year 2 Totals (no setup fee):**

| Plan | Year 2 (BHD) | Year 2 ($) |
|------|-------------|-----------|
| Starter | BHD 6,000 | $15,900 |
| Professional | BHD 9,000 | $23,850 |
| Enterprise | BHD 14,400 | $38,160 |

---

### 1.4 Model 3: Per-Agent Pricing

Ideal for brokerages and agencies that want to scale costs proportional to their team size. Each agent gets their own WhatsApp line, dashboard access, and listing quota.

**Setup Fee: BHD 2,000 ($5,300)** — one-time onboarding, platform deployment, customization.

| Component | BHD/Month | $/Month |
|-----------|-----------|---------|
| **Base Platform Fee** (hosting, AI, WhatsApp base, ops) | BHD 200 | $530 |
| **Per Agent License** (dashboard access, WhatsApp line, listing quota) | BHD 45 | $119 |

**Monthly Cost by Team Size:**

| Agents | Platform (BHD) | Agent Fees (BHD) | Monthly Total (BHD) | Monthly ($) |
|--------|---------------|-----------------|--------------------|-----------|
| 3 | 200 | 135 | **BHD 335** | **$888** |
| 5 | 200 | 225 | **BHD 425** | **$1,126** |
| 10 | 200 | 450 | **BHD 650** | **$1,723** |
| 15 | 200 | 675 | **BHD 875** | **$2,319** |
| 20 | 200 | 900 | **BHD 1,100** | **$2,915** |
| 50 | 200 | 2,250 | **BHD 2,450** | **$6,493** |

**Volume Discounts:**

| Agents | Per-Agent Rate |
|--------|---------------|
| 1–10 | BHD 45/agent |
| 11–25 | BHD 40/agent (11% off) |
| 26–50 | BHD 35/agent (22% off) |
| 50+ | BHD 30/agent (33% off) |

**Year 1 Totals (10 Agents):**

| Component | BHD | $ |
|-----------|-----|---|
| Setup | 2,000 | 5,300 |
| 12 months × BHD 650 | 7,800 | 20,670 |
| **Year 1 Total** | **BHD 9,800** | **$25,970** |

**Year 2 (10 Agents):** BHD 7,800 ($20,670)

**What's Included Per Agent:**

- WhatsApp Business number or shared queue access
- Individual dashboard with listing management
- AI chatbot handling for assigned listings
- 50 active listings per agent
- Performance analytics per agent

---

### 1.5 Model 4: Usage-Based Pricing

Pay proportional to actual platform usage. Best for seasonal businesses, startups, or clients with unpredictable volumes.

**Setup Fee: BHD 3,000 ($7,950)** — one-time platform deployment, integration, customization.

| Component | Rate (BHD) | Rate ($) |
|-----------|-----------|---------|
| **Base Platform Fee** (infra + engineering support) | BHD 150/month | $398/month |
| **Per Property Listed** (published to platform) | BHD 1.5/listing | $3.98/listing |
| **Per WhatsApp Conversation** (24-hour session) | BHD 0.04/conversation | $0.11/conversation |
| **Per AI Interaction** (chatbot query/response) | BHD 0.003/interaction | $0.008/interaction |

**Monthly Cost Scenarios:**

| Scenario | Listings | WhatsApp Convos | AI Interactions | Monthly (BHD) | Monthly ($) |
|----------|----------|-----------------|-----------------|--------------|-------------|
| **Low** (startup/new agency) | 50 | 500 | 5,000 | **BHD 260** | **$689** |
| **Typical** (established agency) | 200 | 2,350 | 30,000 | **BHD 634** | **$1,680** |
| **High** (large brokerage) | 500 | 5,000 | 100,000 | **BHD 1,400** | **$3,710** |
| **Peak** (multi-branch enterprise) | 1,000 | 10,000 | 200,000 | **BHD 2,650** | **$7,023** |

*Calculation for Typical: BHD 150 + (200 × 1.5) + (2,350 × 0.04) + (30,000 × 0.003) = 150 + 300 + 94 + 90 = BHD 634*

**Monthly Cap:** BHD 2,000/month — usage beyond this threshold is not charged additionally. Protects against unexpected spikes.

**Year 1 Total (Typical Usage):**

| Component | BHD | $ |
|-----------|-----|---|
| Setup | 3,000 | 7,950 |
| 12 months × BHD 634 | 7,608 | 20,161 |
| **Year 1 Total** | **BHD 10,608** | **$28,111** |

**Year 2 (Typical Usage):** BHD 7,608 ($20,161)

---

### 1.6 Three-Year Total Cost of Ownership

Comparison across all models assuming **10 agents** and **typical usage** (200 listings/month, 2,350 WhatsApp conversations/month, 30,000 AI interactions/month).

| Model | Year 1 (BHD) | Year 2 (BHD) | Year 3 (BHD) | **3-Year TCO (BHD)** | **3-Year TCO ($)** |
|-------|-------------|-------------|-------------|---------------------|-------------------|
| **1A: Software Only (no AMC)** | 7,174 | 924 | 924 | **BHD 9,022** | **$23,908** |
| **1A: Software Only + Standard AMC** | 8,554 | 2,304 | 2,304 | **BHD 13,162** | **$34,879** |
| **1B: Turnkey (IVIS-Managed)** | 9,750 | 2,664 | 2,664 | **BHD 15,078** | **$39,957** |
| **2: SaaS Professional** | 10,500 | 9,000 | 9,000 | **BHD 28,500** | **$75,525** |
| **3: Per-Agent (10 agents)** | 9,800 | 7,800 | 7,800 | **BHD 25,400** | **$67,310** |
| **4: Usage-Based (typical)** | 10,608 | 7,608 | 7,608 | **BHD 25,824** | **$68,434** |

**Visual Comparison — 3-Year TCO (BHD):**

```
1A (no AMC)          █████████                           BHD 9,022
1A (+ AMC)           █████████████                       BHD 13,162
1B (Turnkey)         ███████████████                     BHD 15,078
2  (SaaS Pro)        ████████████████████████████        BHD 28,500
3  (Per-Agent)       █████████████████████████           BHD 25,400
4  (Usage-Based)     ██████████████████████████          BHD 25,824
                     ──────────────────────────────────
                     0     5K    10K    15K    20K   25K   30K
```

**Key Insight:** One-time license models (1A, 1B) have the lowest 3-year TCO because the large upfront development cost is paid once. Subscription and per-agent models cost more over time but eliminate upfront risk and operational burden.

---

### 1.7 Model Recommendation

| Client Profile | Recommended Model | Why |
|---------------|-------------------|-----|
| **Budget-conscious, has in-house IT** | Model 1A (Software Only) | Lowest TCO, full ownership, self-managed |
| **Wants hassle-free, trusts IVIS** | Model 1B (Turnkey) | One payment, everything managed, lowest long-term managed cost |
| **No upfront budget, wants predictability** | Model 2 (SaaS Professional) | Fixed monthly, no surprises, scales with plan upgrades |
| **Growing brokerage, adding agents** | Model 3 (Per-Agent) | Costs scale linearly with team size |
| **Seasonal or variable volume** | Model 4 (Usage-Based) | Pay only for what you use, protected by monthly cap |

**For the Bahrain market (50–100 concurrent users):**

- **Best overall value:** Model 1B (Turnkey) — BHD 9,750 Year 1, BHD 2,664/year ongoing. Client gets a fully managed system with the lowest recurring cost after Year 1.
- **Lowest total cost:** Model 1A (Software Only) — BHD 9,022 over 3 years if client has technical capability to self-host.
- **Lowest entry barrier:** Model 2 (SaaS Starter) — BHD 500/month with just BHD 1,500 setup.

---

## 2. Budget Summary

### Monthly Cost (Steady State)

| Category | Option A (Budget) | Option B (Recommended) | Option C (Cloud - AWS Bahrain) |
|----------|-------------------|----------------------|-------------------------------|
| Infrastructure | BHD 12 | BHD 40 | BHD 58 |
| WhatsApp Business API | BHD 19 | BHD 19 | BHD 19 |
| AI API | BHD 11 | BHD 11 | BHD 11 |
| Third-Party Services | BHD 6 | BHD 11 | BHD 6 |
| Operational | BHD 57 | BHD 113 | BHD 113 |
| **Monthly Total** | **BHD 105** | **BHD 194** | **BHD 207** |
| **USD Equivalent** | **~$278/mo** | **~$514/mo** | **~$549/mo** |

### One-Time Setup Cost

| Item | Cost (BHD) | Cost ($) |
|------|-----------|----------|
| Development (MVP to Production) | BHD 2,835 | $7,513 |
| WhatsApp Business API Setup | BHD 189 | $500 |
| Infrastructure Setup | BHD 113 | $300 |
| Testing & QA | BHD 378 | $1,002 |
| Documentation | BHD 132 | $350 |
| **Total One-Time** | **BHD 3,647** | **$9,665** |

---

## 3. Infrastructure Costs

### 3.1 Option A — Single VPS (Budget)

| Item | Specification | Provider | Monthly (BHD) | Monthly ($) |
|------|--------------|----------|--------------|-------------|
| VPS Server | 4 vCPU, 8GB RAM, 100GB SSD | Hetzner / DigitalOcean | BHD 7.5 | $20 |
| Bandwidth | 4 TB included | Included | BHD 0 | $0 |
| Backup Storage | 20GB automated snapshots | Provider | BHD 1.9 | $5 |
| SSL Certificate | Let's Encrypt | Free | BHD 0 | $0 |
| **Subtotal** | | | **BHD 9.4** | **$25** |

**Location:** EU (Hetzner Falkenstein/Helsinki) or Singapore for lower latency to Bahrain.

### 3.2 Option B — Multi-Server (Recommended)

| Item | Specification | Qty | Monthly (BHD) | Monthly ($) |
|------|--------------|-----|--------------|-------------|
| App Server | 4 vCPU, 8GB RAM, 50GB SSD | 2 | BHD 15 | $40 |
| DB Server | 2 vCPU, 4GB RAM, 100GB SSD | 1 | BHD 7.5 | $20 |
| DB Replica | 2 vCPU, 4GB RAM, 50GB SSD | 1 | BHD 5.7 | $15 |
| Object Storage | S3 — 50GB + transfers | 1 | BHD 1.9 | $5 |
| Load Balancer | Managed LB | 1 | BHD 3.8 | $10 |
| Backup Storage | Automated daily | 1 | BHD 1.9 | $5 |
| **Subtotal** | | | **BHD 35.8** | **$95** |

### 3.3 Option C — AWS Bahrain Region (me-south-1)

| Service | Specification | Monthly (BHD) | Monthly ($) |
|---------|--------------|--------------|-------------|
| EC2 (App) | 2x t3.medium (2 vCPU, 4GB) | BHD 24.5 | $65 |
| RDS (DB) | db.t3.micro, 20GB, Multi-AZ | BHD 13.2 | $35 |
| S3 (Images) | 50GB Standard | BHD 0.5 | $1.15 |
| CloudFront (CDN) | 100GB transfer | BHD 3.8 | $10 |
| ALB | Application Load Balancer | BHD 7.5 | $20 |
| Route 53 | Hosted zone | BHD 0.2 | $0.50 |
| **Subtotal** | | **BHD 49.7** | **$131.65** |

**Advantage of AWS me-south-1:** Data residency in Bahrain, lowest latency for local users, compliance with any future Bahrain data localization requirements.

---

## 4. WhatsApp Business API Costs

### 4.1 Meta Per-Message Pricing (Middle East)

Meta charges per **message** sent by the business. User-initiated service conversations are free with no limit.

| Message Type | Cost per Message | Description |
|-------------|-----------------|-------------|
| **Marketing** | $0.0341 (~BHD 0.013) | Promotional messages, new listing alerts |
| **Utility** | $0.0091 (~BHD 0.003) | Booking confirmations, listing status updates |
| **Authentication** | $0.0091 (~BHD 0.003) | OTP verification |
| **Service** | Free (unlimited) | User-initiated conversations, search, inquiries |

### 4.2 Monthly WhatsApp Cost Estimate

| Activity | Messages/Month | Type | Cost ($) |
|----------|---------------|------|----------|
| User inquiries (search, browse) | 3,000+ | Service (free) | $0 |
| New listing notifications | 400 | Marketing | $13.64 |
| Price change alerts to searchers | 200 | Marketing | $6.82 |
| Status updates (published, expired) | 300 | Utility | $2.73 |
| Expiry reminders | 100 | Utility | $0.91 |
| OTP verifications | 200 | Authentication | $1.82 |
| **Monthly WhatsApp Total** | **~4,200** | | **$25.92** |
| **BHD Equivalent** | | | **BHD 9.8** |

### 4.3 WhatsApp Business Platform Fee

| Item | Cost | Frequency |
|------|------|-----------|
| Meta Cloud API | Free (self-hosted) | — |
| BSP fee (if using Twilio/360dialog) | $0–15/mo depending on BSP | Monthly |
| WhatsApp Business Phone Number | Included with Meta verification | — |
| **Estimated BSP/Platform Fee** | **~BHD 5.7 ($15)** | Monthly |

### 4.4 Total WhatsApp Monthly Cost

| Component | Monthly (BHD) | Monthly ($) |
|-----------|--------------|-------------|
| Message fees | BHD 9.8 | $25.92 |
| BSP platform fee | BHD 5.7 | $15.00 |
| Meta Business verification | Free | $0 |
| **Total WhatsApp** | **BHD 15.5** | **~$40.92** |

**Rounded estimate used in budget: BHD 19/month ($50)** — includes buffer for growth.

---

## 5. AI / API Costs

### 5.1 IVIS LABS Chat API

| Metric | Value |
|--------|-------|
| Model | granite3.1-dense:latest |
| Avg tokens per request | ~500 input + ~300 output |
| Requests per day (est.) | 500–1,000 |
| Monthly requests | 15,000–30,000 |

| Tier | Requests/Month | Monthly ($) | Monthly (BHD) |
|------|---------------|-------------|--------------|
| Current (free/starter) | Up to 10,000 | $0 | BHD 0 |
| Growth | 10,000–50,000 | $30 | BHD 11 |
| Scale | 50,000–200,000 | $100 | BHD 38 |

**Estimated for 50–100 concurrent users:** BHD 11/month ($30)

### 5.2 AI for Auto-Screening (Image Moderation + NLP)

| Service | Usage | Monthly ($) | Monthly (BHD) |
|---------|-------|-------------|--------------|
| Image moderation API | ~200 listings × 3 images | $2–5 | BHD 1–2 |
| Content screening (NLP) | ~200 listings | Included in AI API | BHD 0 |
| OCR for ID verification | ~100 verifications | $1–3 | BHD 0.5–1 |
| **AI Screening Subtotal** | | **~$5** | **~BHD 2** |

**Total AI Monthly: BHD 13 ($35)** — rounded estimate used: **BHD 11** (screening covered by AI API quota).

---

## 6. Third-Party Services

### 6.1 Monthly Services

| Service | Tier | Monthly (BHD) | Monthly ($) |
|---------|------|--------------|-------------|
| **Domain** | .bh domain or subdomain | BHD 0–2 | $0–5 |
| **Cloudflare** | Free (CDN + DDoS + WAF) | BHD 0 | $0 |
| **SSL** | Let's Encrypt (auto-renew) | BHD 0 | $0 |
| **UptimeRobot** | Free (50 monitors) | BHD 0 | $0 |
| **Sentry** | Free (5K errors/month) | BHD 0 | $0 |
| **GitHub** | Free (private repos) | BHD 0 | $0 |
| **SMS Gateway** (fallback for WhatsApp) | Twilio / local BH provider | BHD 3.8 | $10 |
| **Email SMTP** | SendGrid (100 emails/day free) | BHD 0 | $0 |
| **Analytics** | Google Analytics / Plausible | BHD 0–3.8 | $0–10 |
| **Subtotal** | | **BHD 3.8–9.6** | **$10–25** |

### 6.2 One-Time Services

| Service | Cost (BHD) |
|---------|-----------|
| .bh domain registration (if new) | BHD 19/year |
| Meta Business Verification (WhatsApp) | Free |
| WhatsApp Business Display Name approval | Free |

---

## 7. Development Costs

### 7.1 MVP to Production (One-Time)

| Task | Hours | Rate (BHD/hr) | Cost (BHD) |
|------|-------|---------------|-----------|
| **Backend Development** | | | |
| PostgreSQL migration (JSON → DB) | 16 | BHD 19 | BHD 304 |
| S3 image upload integration | 12 | BHD 19 | BHD 228 |
| WhatsApp Business API integration | 24 | BHD 19 | BHD 456 |
| WhatsApp webhook + message router | 16 | BHD 19 | BHD 304 |
| Authentication & authorization | 16 | BHD 19 | BHD 304 |
| AI auto-screening pipeline | 16 | BHD 19 | BHD 304 |
| Rate limiting & security hardening | 8 | BHD 19 | BHD 152 |
| API optimization & caching | 12 | BHD 19 | BHD 228 |
| **Frontend Development** | | | |
| Admin dashboard (exception queue, audit) | 24 | BHD 19 | BHD 456 |
| Property listing web view | 16 | BHD 19 | BHD 304 |
| Landing page polish & Arabic RTL | 12 | BHD 19 | BHD 228 |
| Mobile responsiveness testing | 8 | BHD 19 | BHD 152 |
| **AI Integration** | | | |
| Bahrain real estate prompt tuning | 12 | BHD 19 | BHD 228 |
| Arabic NLU (Gulf dialect) training data | 16 | BHD 19 | BHD 304 |
| Requirement extraction for Bahrain market | 8 | BHD 19 | BHD 152 |
| **DevOps** | | | |
| Docker containerization | 8 | BHD 19 | BHD 152 |
| CI/CD pipeline setup | 8 | BHD 19 | BHD 152 |
| Server provisioning & Nginx config | 6 | BHD 19 | BHD 114 |
| Monitoring & alerting setup | 4 | BHD 19 | BHD 76 |
| **Subtotal Development** | **232 hrs** | | **BHD 4,098** |

*Rate: BHD 19/hr ≈ $50/hr — competitive offshore development rate*

### 7.2 Testing & QA (One-Time)

| Task | Hours | Rate (BHD/hr) | Cost (BHD) |
|------|-------|---------------|-----------|
| Unit testing | 12 | BHD 15 | BHD 180 |
| Integration testing (WhatsApp flow) | 12 | BHD 15 | BHD 180 |
| Arabic language testing | 8 | BHD 15 | BHD 120 |
| Load testing (50–100 users) | 6 | BHD 15 | BHD 90 |
| Security audit | 8 | BHD 15 | BHD 120 |
| **Subtotal QA** | **46 hrs** | | **BHD 690** |

### 7.3 Documentation (One-Time)

| Task | Cost (BHD) |
|------|-----------|
| API documentation | BHD 57 |
| Deployment runbook | BHD 38 |
| User guide (English + Arabic) | BHD 57 |
| Architecture diagrams | BHD 38 |
| **Subtotal Docs** | **BHD 190** |

---

## 8. Operational Costs

### 8.1 Monthly Maintenance

| Item | Hours/Month | Rate (BHD/hr) | Monthly (BHD) |
|------|------------|---------------|--------------|
| Server maintenance & updates | 2 | BHD 19 | BHD 38 |
| Bug fixes & minor improvements | 4 | BHD 19 | BHD 76 |
| WhatsApp template management | 1 | BHD 19 | BHD 19 |
| Database backup verification | 1 | BHD 19 | BHD 19 |
| Security patches | 1 | BHD 19 | BHD 19 |
| Monitoring & alerts response | 2 | BHD 19 | BHD 38 |
| **Subtotal (Option A — minimal)** | **4 hrs** | | **BHD 57** |
| **Subtotal (Option B/C — full)** | **11 hrs** | | **BHD 113** |

### 8.2 Human Agent Costs (Exception Review)

With the AI auto-screening model (95% automated), human intervention is minimal:

| Activity | Est. Hours/Month | Rate (BHD/hr) | Monthly (BHD) |
|----------|-----------------|---------------|--------------|
| Review flagged listings (~5% of submissions) | 2 | BHD 8 | BHD 16 |
| Handle ownership verification edge cases | 1 | BHD 8 | BHD 8 |
| Respond to user escalations | 1 | BHD 8 | BHD 8 |
| **Subtotal Human Agent** | **4 hrs** | | **BHD 32** |

*This is a part-time role — no dedicated full-time agent needed for 50–100 users.*

---

## 9. One-Time Setup Costs

### Complete Breakdown

| Category | Cost (BHD) | Cost ($) |
|----------|-----------|----------|
| Backend Development | BHD 2,280 | $6,042 |
| Frontend Development | BHD 1,140 | $3,021 |
| AI Integration | BHD 684 | $1,813 |
| DevOps & Infrastructure | BHD 494 | $1,309 |
| WhatsApp Business API Integration | BHD 760 | $2,014 |
| Testing & QA | BHD 690 | $1,829 |
| Documentation | BHD 190 | $504 |
| **Total One-Time** | **BHD 6,238** | **$16,531** |

---

## 10. Monthly Recurring Costs — Micro Split

### Option B (Recommended) — Detailed Breakdown

| # | Line Item | Monthly (BHD) | % of Total |
|---|-----------|--------------|-----------|
| | **INFRASTRUCTURE** | | |
| 1 | App Server 1 (4 vCPU, 8GB RAM) | BHD 7.5 | 3.3% |
| 2 | App Server 2 (4 vCPU, 8GB RAM) | BHD 7.5 | 3.3% |
| 3 | DB Server Primary (2 vCPU, 4GB RAM) | BHD 7.5 | 3.3% |
| 4 | DB Replica (2 vCPU, 4GB RAM) | BHD 5.7 | 2.5% |
| 5 | Object Storage (S3 — 50GB) | BHD 1.9 | 0.8% |
| 6 | Load Balancer (managed) | BHD 3.8 | 1.7% |
| 7 | Backup Storage (daily snapshots) | BHD 1.9 | 0.8% |
| | **Infrastructure Subtotal** | **BHD 35.8** | **15.8%** |
| | | | |
| | **WHATSAPP BUSINESS API** | | |
| 8 | Message fees (marketing + utility + auth) | BHD 9.8 | 4.3% |
| 9 | BSP platform fee | BHD 5.7 | 2.5% |
| | **WhatsApp Subtotal** | **BHD 15.5** | **6.8%** |
| | | | |
| | **AI / API** | | |
| 10 | IVIS LABS Chat API (30K req/mo) | BHD 11 | 4.9% |
| 11 | Image moderation + OCR | BHD 2 | 0.9% |
| | **AI Subtotal** | **BHD 13** | **5.7%** |
| | | | |
| | **THIRD-PARTY SERVICES** | | |
| 12 | SMS gateway (WhatsApp fallback) | BHD 3.8 | 1.7% |
| 13 | Analytics | BHD 3.8 | 1.7% |
| 14 | Domain + misc | BHD 1.5 | 0.7% |
| | **Third-Party Subtotal** | **BHD 9.1** | **4.0%** |
| | | | |
| | **OPERATIONS (ENGINEERING)** | | |
| 15 | Server maintenance (2 hrs) | BHD 38 | 16.8% |
| 16 | Bug fixes & improvements (4 hrs) | BHD 76 | 33.5% |
| 17 | WhatsApp template management (1 hr) | BHD 19 | 8.4% |
| 18 | Backup verification (1 hr) | BHD 19 | 8.4% |
| 19 | Security patches (1 hr) | BHD 19 | 8.4% |
| 20 | Monitoring & response (2 hrs) | BHD 38 | 16.8% |
| | **Operations Subtotal** | **BHD 113** | **49.8%** |
| | | | |
| | **HUMAN AGENT (EXCEPTION REVIEW)** | | |
| 21 | Flagged listing review (2 hrs) | BHD 16 | 7.1% |
| 22 | Verification edge cases (1 hr) | BHD 8 | 3.5% |
| 23 | User escalations (1 hr) | BHD 8 | 3.5% |
| | **Human Agent Subtotal** | **BHD 32** | **14.1%** |
| | | | |
| | | | |
| | **GRAND TOTAL** | **BHD 218** | **100%** |
| | **USD Equivalent** | **~$578** | |

### Cost Distribution

```
Operations (Engineering)  █████████████████████████  49.8%  (BHD 113)
Infrastructure            ████████                   15.8%  (BHD 35.8)
Human Agent (exceptions)  ███████                    14.1%  (BHD 32)
WhatsApp Business API     ███                         6.8%  (BHD 15.5)
AI / API                  ███                         5.7%  (BHD 13)
Third-Party Services      ██                          4.0%  (BHD 9.1)
Buffer                    ██                          3.8%  (BHD 9)
                          ─────────────────────────────────
                          Total: ~BHD 227/month (~$601)
```

---

## 11. Annual Budget Projection

### Year 1 — Full Breakdown

| Quarter | Setup (BHD) | Infra (BHD) | WhatsApp (BHD) | AI (BHD) | Ops (BHD) | Agent (BHD) | Services (BHD) | Quarterly (BHD) |
|---------|------------|-------------|----------------|---------|-----------|------------|----------------|-----------------|
| Q1 (Setup) | BHD 6,238 | BHD 28 | BHD 50 | BHD 33 | BHD 171 | BHD 48 | BHD 27 | **BHD 6,595** |
| Q2 (Growth) | — | BHD 107 | BHD 50 | BHD 33 | BHD 339 | BHD 96 | BHD 27 | **BHD 652** |
| Q3 (Scale) | — | BHD 107 | BHD 67 | BHD 39 | BHD 339 | BHD 96 | BHD 27 | **BHD 675** |
| Q4 (Stable) | — | BHD 107 | BHD 67 | BHD 39 | BHD 339 | BHD 96 | BHD 27 | **BHD 675** |

*Q1 includes one-time setup cost of BHD 6,238*
*Q3-Q4: WhatsApp costs increase slightly as user base grows*

| | Annual (BHD) | Annual ($) |
|---|-------------|-----------|
| **Year 1 Total** | **BHD 8,597** | **~$22,782** |
| **Year 2 Projected (recurring only)** | **BHD 2,700** | **~$7,155** |

### Per-User Cost Analysis

| Metric | Value |
|--------|-------|
| Monthly active users (est.) | 500–1,000 |
| Monthly cost (recurring) | BHD 227 |
| **Cost per active user** | **BHD 0.23–0.45/month ($0.60–1.20)** |
| Cost per property listed | ~BHD 0.5 ($1.30) |
| Cost per AI interaction | ~BHD 0.001 ($0.002) |
| Cost per WhatsApp message | ~BHD 0.003–0.013 ($0.009–0.034) |

---

## 12. Cost Optimization Strategies

| Strategy | Savings | Effort |
|----------|---------|--------|
| Use Hetzner instead of AWS Bahrain | 40–50% on infra | Low (slightly higher latency) |
| Meta Cloud API direct (no BSP fee) | BHD 5.7/mo on WhatsApp | Low |
| AI response caching (Redis) | 30–50% on AI costs | Medium |
| Cloudflare caching for images | 40% on bandwidth | Low |
| Batch WhatsApp notifications | 20–30% on message fees | Low |
| Reserved instances (1-yr commit) | 20–40% on compute | Low |
| Self-host AI model (at scale) | 70% on AI costs | High |
| Compress images on upload | 30% on storage | Low |

**Quick wins (save ~BHD 15/month):**
1. Meta Cloud API direct, skip BSP (BHD 5.7 savings)
2. Enable Cloudflare image caching (BHD 3 savings)
3. Add Redis AI cache (BHD 5 savings on AI calls)
4. Batch marketing notifications to reduce message count (BHD 3 savings)

---

## 13. Budget by Phase

### Phase 1: MVP Launch (Month 1–2)

| Item | Cost (BHD) |
|------|-----------|
| Development (one-time) | BHD 6,238 |
| Single VPS (Option A — 2 months) | BHD 19 |
| WhatsApp Business API setup + 2 months | BHD 227 |
| AI API (2 months) | BHD 22 |
| **Phase 1 Total** | **BHD 6,506** |

### Phase 2: Production Hardening (Month 3–4)

| Item | Cost (BHD) |
|------|-----------|
| PostgreSQL migration | BHD 304 |
| S3 integration | BHD 228 |
| Multi-server setup (Option B) — 2 months infra | BHD 72 |
| Load testing | BHD 90 |
| Security audit | BHD 120 |
| Operations (2 months) | BHD 226 |
| **Phase 2 Total** | **BHD 1,040** |

### Phase 3: Scale & Optimize (Month 5–6)

| Item | Cost (BHD) |
|------|-----------|
| Redis caching layer | BHD 152 |
| Arabic NLU fine-tuning | BHD 304 |
| CDN optimization | BHD 76 |
| Monthly infra (2 months) | BHD 72 |
| Monthly WhatsApp (2 months) | BHD 34 |
| Monthly ops (2 months) | BHD 226 |
| **Phase 3 Total** | **BHD 864** |

### Phase 4: Steady State (Month 7+)

| Item | Monthly (BHD) | Annual (BHD) |
|------|--------------|-------------|
| Infrastructure | BHD 36 | BHD 432 |
| WhatsApp Business API | BHD 19 | BHD 228 |
| AI API | BHD 13 | BHD 156 |
| Operations (engineering) | BHD 113 | BHD 1,356 |
| Human agent (exceptions) | BHD 32 | BHD 384 |
| Third-party services | BHD 9 | BHD 108 |
| **Monthly Total** | **BHD 222** | **BHD 2,664** |

---

### Total Investment Summary

| Period | Cost (BHD) | Cost ($) |
|--------|-----------|----------|
| Phase 1 — MVP Launch (2 months) | BHD 6,506 | $17,241 |
| Phase 2 — Production (2 months) | BHD 1,040 | $2,756 |
| Phase 3 — Scale (2 months) | BHD 864 | $2,290 |
| Phase 4 — Year 1 remainder (6 months) | BHD 1,332 | $3,530 |
| **Year 1 Grand Total** | **BHD 9,742** | **$25,817** |
| **Year 2 (recurring only)** | **BHD 2,664** | **$7,060** |

---

### Key Assumptions

| Assumption | Value |
|-----------|-------|
| Currency conversion | 1 BHD = $2.65 USD |
| WhatsApp messages/month | ~1,200 outbound (service inbound is free & unlimited) |
| New property listings/month | ~50–200 |
| Monthly active users | 500–1,000 |
| AI requests/month | 15,000–30,000 |
| Development rate | BHD 19/hr ($50/hr) |
| Human agent rate | BHD 8/hr ($21/hr) |
| Human agent hours needed | ~4 hrs/month (minimal intervention model) |

---

*Pricing estimates as of February 2026. Actual costs may vary based on provider, region, and usage patterns.*
*WhatsApp Business API pricing based on Meta's per-message rates for Middle East (effective July 2025).*
*All rates reflect Bahrain market deployment.*

*Document prepared by IVIS LABS Engineering Team — February 2026*
