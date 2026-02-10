# IVIS Property Listings — Pricing & Budget Estimation

**Version:** 2.0
**Date:** February 2026
**Market:** Kingdom of Bahrain
**Target:** 50–100 Concurrent Users, Production Deployment
**Currency:** Bahraini Dinar (BHD) and USD ($) — 1 BHD ≈ $2.65

---

## Table of Contents

1. [Budget Summary](#1-budget-summary)
2. [Infrastructure Costs](#2-infrastructure-costs)
3. [WhatsApp Business API Costs](#3-whatsapp-business-api-costs)
4. [AI / API Costs](#4-ai--api-costs)
5. [Third-Party Services](#5-third-party-services)
6. [Development Costs](#6-development-costs)
7. [Operational Costs](#7-operational-costs)
8. [One-Time Setup Costs](#8-one-time-setup-costs)
9. [Monthly Recurring Costs — Micro Split](#9-monthly-recurring-costs--micro-split)
10. [Annual Budget Projection](#10-annual-budget-projection)
11. [Cost Optimization Strategies](#11-cost-optimization-strategies)
12. [Budget by Phase](#12-budget-by-phase)

---

## 1. Budget Summary

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

## 2. Infrastructure Costs

### 2.1 Option A — Single VPS (Budget)

| Item | Specification | Provider | Monthly (BHD) | Monthly ($) |
|------|--------------|----------|--------------|-------------|
| VPS Server | 4 vCPU, 8GB RAM, 100GB SSD | Hetzner / DigitalOcean | BHD 7.5 | $20 |
| Bandwidth | 4 TB included | Included | BHD 0 | $0 |
| Backup Storage | 20GB automated snapshots | Provider | BHD 1.9 | $5 |
| SSL Certificate | Let's Encrypt | Free | BHD 0 | $0 |
| **Subtotal** | | | **BHD 9.4** | **$25** |

**Location:** EU (Hetzner Falkenstein/Helsinki) or Singapore for lower latency to Bahrain.

### 2.2 Option B — Multi-Server (Recommended)

| Item | Specification | Qty | Monthly (BHD) | Monthly ($) |
|------|--------------|-----|--------------|-------------|
| App Server | 4 vCPU, 8GB RAM, 50GB SSD | 2 | BHD 15 | $40 |
| DB Server | 2 vCPU, 4GB RAM, 100GB SSD | 1 | BHD 7.5 | $20 |
| DB Replica | 2 vCPU, 4GB RAM, 50GB SSD | 1 | BHD 5.7 | $15 |
| Object Storage | S3 — 50GB + transfers | 1 | BHD 1.9 | $5 |
| Load Balancer | Managed LB | 1 | BHD 3.8 | $10 |
| Backup Storage | Automated daily | 1 | BHD 1.9 | $5 |
| **Subtotal** | | | **BHD 35.8** | **$95** |

### 2.3 Option C — AWS Bahrain Region (me-south-1)

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

## 3. WhatsApp Business API Costs

### 3.1 Meta Conversation-Based Pricing (Middle East)

Meta charges per **conversation** (a 24-hour message window), not per message.

| Conversation Type | Cost per Conversation | Description |
|-------------------|-----------------------|-------------|
| **Marketing** | $0.0572 (~BHD 0.022) | Promotional messages, new listing alerts |
| **Utility** | $0.0200 (~BHD 0.008) | Booking confirmations, listing status updates |
| **Authentication** | $0.0265 (~BHD 0.010) | OTP verification |
| **Service** | Free (first 1,000/mo) | User-initiated conversations (search, inquiries) |

### 3.2 Monthly WhatsApp Cost Estimate

| Activity | Conversations/Month | Type | Cost ($) |
|----------|---------------------|------|----------|
| User inquiries (search, browse) | 1,000 | Service (free) | $0 |
| User inquiries (overflow >1,000) | 500 | Service | $0 * |
| New listing notifications | 200 | Marketing | $11.44 |
| Status updates (published, expired) | 300 | Utility | $6.00 |
| OTP verifications | 200 | Authentication | $5.30 |
| Price change alerts to searchers | 100 | Marketing | $5.72 |
| Expiry reminders | 50 | Utility | $1.00 |
| **Monthly WhatsApp Total** | **~2,350** | | **$29.46** |
| **BHD Equivalent** | | | **BHD 11.1** |

*Note: First 1,000 service conversations per month are free. Additional service conversations are priced regionally.*

### 3.3 WhatsApp Business Platform Fee

| Item | Cost | Frequency |
|------|------|-----------|
| Meta Cloud API | Free (self-hosted) | — |
| BSP fee (if using Twilio/360dialog) | $0–15/mo depending on BSP | Monthly |
| WhatsApp Business Phone Number | Included with Meta verification | — |
| **Estimated BSP/Platform Fee** | **~BHD 5.7 ($15)** | Monthly |

### 3.4 Total WhatsApp Monthly Cost

| Component | Monthly (BHD) | Monthly ($) |
|-----------|--------------|-------------|
| Conversation fees | BHD 11.1 | $29.46 |
| BSP platform fee | BHD 5.7 | $15.00 |
| Meta Business verification | Free | $0 |
| **Total WhatsApp** | **BHD 16.8** | **~$44.46** |

**Rounded estimate used in budget: BHD 19/month ($50)** — includes buffer for growth.

---

## 4. AI / API Costs

### 4.1 IVIS LABS Chat API

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

### 4.2 AI for Auto-Screening (Image Moderation + NLP)

| Service | Usage | Monthly ($) | Monthly (BHD) |
|---------|-------|-------------|--------------|
| Image moderation API | ~200 listings × 3 images | $2–5 | BHD 1–2 |
| Content screening (NLP) | ~200 listings | Included in AI API | BHD 0 |
| OCR for ID verification | ~100 verifications | $1–3 | BHD 0.5–1 |
| **AI Screening Subtotal** | | **~$5** | **~BHD 2** |

**Total AI Monthly: BHD 13 ($35)** — rounded estimate used: **BHD 11** (screening covered by AI API quota).

---

## 5. Third-Party Services

### 5.1 Monthly Services

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

### 5.2 One-Time Services

| Service | Cost (BHD) |
|---------|-----------|
| .bh domain registration (if new) | BHD 19/year |
| Meta Business Verification (WhatsApp) | Free |
| WhatsApp Business Display Name approval | Free |

---

## 6. Development Costs

### 6.1 MVP to Production (One-Time)

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

### 6.2 Testing & QA (One-Time)

| Task | Hours | Rate (BHD/hr) | Cost (BHD) |
|------|-------|---------------|-----------|
| Unit testing | 12 | BHD 15 | BHD 180 |
| Integration testing (WhatsApp flow) | 12 | BHD 15 | BHD 180 |
| Arabic language testing | 8 | BHD 15 | BHD 120 |
| Load testing (50–100 users) | 6 | BHD 15 | BHD 90 |
| Security audit | 8 | BHD 15 | BHD 120 |
| **Subtotal QA** | **46 hrs** | | **BHD 690** |

### 6.3 Documentation (One-Time)

| Task | Cost (BHD) |
|------|-----------|
| API documentation | BHD 57 |
| Deployment runbook | BHD 38 |
| User guide (English + Arabic) | BHD 57 |
| Architecture diagrams | BHD 38 |
| **Subtotal Docs** | **BHD 190** |

---

## 7. Operational Costs

### 7.1 Monthly Maintenance

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

### 7.2 Human Agent Costs (Exception Review)

With the AI auto-screening model (95% automated), human intervention is minimal:

| Activity | Est. Hours/Month | Rate (BHD/hr) | Monthly (BHD) |
|----------|-----------------|---------------|--------------|
| Review flagged listings (~5% of submissions) | 2 | BHD 8 | BHD 16 |
| Handle ownership verification edge cases | 1 | BHD 8 | BHD 8 |
| Respond to user escalations | 1 | BHD 8 | BHD 8 |
| **Subtotal Human Agent** | **4 hrs** | | **BHD 32** |

*This is a part-time role — no dedicated full-time agent needed for 50–100 users.*

---

## 8. One-Time Setup Costs

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

## 9. Monthly Recurring Costs — Micro Split

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
| 8 | Conversation fees (service + marketing + utility) | BHD 11.1 | 4.9% |
| 9 | BSP platform fee | BHD 5.7 | 2.5% |
| | **WhatsApp Subtotal** | **BHD 16.8** | **7.4%** |
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
| | **GRAND TOTAL** | **BHD 220** | **100%** |
| | **USD Equivalent** | **~$583** | |

### Cost Distribution

```
Operations (Engineering)  █████████████████████████  49.8%  (BHD 113)
Infrastructure            ████████                   15.8%  (BHD 35.8)
Human Agent (exceptions)  ███████                    14.1%  (BHD 32)
WhatsApp Business API     ████                        7.4%  (BHD 16.8)
AI / API                  ███                         5.7%  (BHD 13)
Third-Party Services      ██                          4.0%  (BHD 9.1)
Buffer                    ██                          3.2%  (BHD 7)
                          ─────────────────────────────────
                          Total: ~BHD 227/month (~$601)
```

---

## 10. Annual Budget Projection

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
| Cost per WhatsApp conversation | ~BHD 0.008–0.022 ($0.02–0.06) |

---

## 11. Cost Optimization Strategies

| Strategy | Savings | Effort |
|----------|---------|--------|
| Use Hetzner instead of AWS Bahrain | 40–50% on infra | Low (slightly higher latency) |
| Meta Cloud API direct (no BSP fee) | BHD 5.7/mo on WhatsApp | Low |
| AI response caching (Redis) | 30–50% on AI costs | Medium |
| Cloudflare caching for images | 40% on bandwidth | Low |
| Batch WhatsApp notifications | 20–30% on conversation fees | Low |
| Reserved instances (1-yr commit) | 20–40% on compute | Low |
| Self-host AI model (at scale) | 70% on AI costs | High |
| Compress images on upload | 30% on storage | Low |

**Quick wins (save ~BHD 15/month):**
1. Meta Cloud API direct, skip BSP (BHD 5.7 savings)
2. Enable Cloudflare image caching (BHD 3 savings)
3. Add Redis AI cache (BHD 5 savings on AI calls)
4. Batch marketing notifications into fewer conversations (BHD 3 savings)

---

## 12. Budget by Phase

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
| WhatsApp conversations/month | ~2,350 (growing to ~3,500 by Q4) |
| New property listings/month | ~50–200 |
| Monthly active users | 500–1,000 |
| AI requests/month | 15,000–30,000 |
| Development rate | BHD 19/hr ($50/hr) |
| Human agent rate | BHD 8/hr ($21/hr) |
| Human agent hours needed | ~4 hrs/month (minimal intervention model) |

---

*Pricing estimates as of February 2026. Actual costs may vary based on provider, region, and usage patterns.*
*WhatsApp Business API pricing based on Meta's Middle East conversation rates.*
*All rates reflect Bahrain market deployment.*

*Document prepared by IVIS LABS Engineering Team — February 2026*
