# IVIS Property Listings — Pricing & Budget Estimation

**Version:** 1.0
**Date:** February 2026
**Target:** 50–100 Concurrent Users, Production Deployment
**Currency:** INR (₹) and USD ($) — 1 USD ≈ ₹83

---

## Table of Contents

1. [Budget Summary](#1-budget-summary)
2. [Infrastructure Costs](#2-infrastructure-costs)
3. [AI / API Costs](#3-ai--api-costs)
4. [Development Costs](#4-development-costs)
5. [Third-Party Services](#5-third-party-services)
6. [Operational Costs](#6-operational-costs)
7. [One-Time Setup Costs](#7-one-time-setup-costs)
8. [Monthly Recurring Costs](#8-monthly-recurring-costs)
9. [Annual Budget Projection](#9-annual-budget-projection)
10. [Cost Optimization Strategies](#10-cost-optimization-strategies)
11. [Budget by Phase](#11-budget-by-phase)

---

## 1. Budget Summary

### Monthly Cost (Steady State)

| Category | Option A (Budget) | Option B (Recommended) | Option C (Cloud) |
|----------|-------------------|----------------------|------------------|
| Infrastructure | ₹2,500 | ₹8,300 | ₹12,500 |
| AI API | ₹2,500 | ₹2,500 | ₹2,500 |
| Third-Party Services | ₹850 | ₹1,700 | ₹850 |
| Operational | ₹4,200 | ₹8,300 | ₹8,300 |
| **Monthly Total** | **₹10,050** | **₹20,800** | **₹24,150** |
| **USD Equivalent** | **~$121/mo** | **~$251/mo** | **~$291/mo** |

### One-Time Setup Cost

| Item | Cost (₹) |
|------|----------|
| Development (MVP to Production) | ₹2,50,000 |
| Infrastructure Setup | ₹25,000 |
| Testing & QA | ₹40,000 |
| Documentation | ₹15,000 |
| **Total One-Time** | **₹3,30,000 (~$3,976)** |

---

## 2. Infrastructure Costs

### 2.1 Option A — Single VPS (Budget)

| Item | Specification | Provider | Monthly (₹) | Monthly ($) |
|------|--------------|----------|-------------|-------------|
| VPS Server | 4 vCPU, 8GB RAM, 100GB SSD | DigitalOcean / Hetzner | ₹1,660 | $20 |
| Bandwidth | 4 TB included | Included | ₹0 | $0 |
| Backup Storage | 20GB automated snapshots | Provider | ₹420 | $5 |
| SSL Certificate | Let's Encrypt | Free | ₹0 | $0 |
| **Subtotal** | | | **₹2,080** | **$25** |

### 2.2 Option B — Multi-Server (Recommended)

| Item | Specification | Qty | Monthly (₹) | Monthly ($) |
|------|--------------|-----|-------------|-------------|
| App Server | 4 vCPU, 8GB RAM, 50GB SSD | 2 | ₹3,320 | $40 |
| DB Server | 2 vCPU, 4GB RAM, 100GB SSD | 1 | ₹1,660 | $20 |
| DB Replica | 2 vCPU, 4GB RAM, 50GB SSD | 1 | ₹1,250 | $15 |
| Object Storage | S3 — 50GB + transfers | 1 | ₹420 | $5 |
| Load Balancer | Managed LB | 1 | ₹830 | $10 |
| Backup Storage | Automated daily | 1 | ₹420 | $5 |
| **Subtotal** | | | **₹7,900** | **$95** |

### 2.3 Option C — AWS Cloud

| Service | Specification | Monthly (₹) | Monthly ($) |
|---------|--------------|-------------|-------------|
| EC2 (App) | 2x t3.medium (2 vCPU, 4GB) | ₹5,000 | $60 |
| RDS (DB) | db.t3.micro, 20GB, Multi-AZ | ₹2,500 | $30 |
| S3 (Images) | 50GB Standard | ₹100 | $1.15 |
| CloudFront (CDN) | 100GB transfer | ₹830 | $10 |
| ALB | Application Load Balancer | ₹1,660 | $20 |
| Route 53 | Hosted zone | ₹40 | $0.50 |
| **Subtotal** | | **₹10,130** | **$121.65** |

---

## 3. AI / API Costs

### 3.1 IVIS LABS Chat API

| Metric | Value |
|--------|-------|
| Model | granite3.1-dense:latest |
| Avg tokens per request | ~500 input + ~300 output |
| Requests per day (est.) | 500–1,000 |
| Monthly requests | 15,000–30,000 |

| Tier | Requests/Month | Monthly (₹) | Monthly ($) |
|------|---------------|-------------|-------------|
| Current (free/starter) | Up to 10,000 | ₹0 | $0 |
| Growth | 10,000–50,000 | ₹2,500 | $30 |
| Scale | 50,000–200,000 | ₹8,300 | $100 |

**Estimated for 50–100 concurrent users:** ₹2,500/month ($30)

### 3.2 Fallback: Self-Hosted AI (Future)

| Item | Specification | One-Time (₹) | Monthly (₹) |
|------|--------------|-------------|-------------|
| GPU Server | RTX 4090, 64GB RAM | ₹2,50,000 | ₹5,000 (power/colo) |
| Cloud GPU | A10G spot instance | — | ₹25,000 |

*Recommended only at >100K requests/month when API costs exceed ₹15,000/mo*

---

## 4. Development Costs

### 4.1 MVP to Production (One-Time)

| Task | Hours | Rate (₹/hr) | Cost (₹) |
|------|-------|-------------|----------|
| **Backend Development** | | | |
| PostgreSQL migration (JSON → DB) | 16 | ₹1,500 | ₹24,000 |
| S3 image upload integration | 12 | ₹1,500 | ₹18,000 |
| Authentication & authorization | 20 | ₹1,500 | ₹30,000 |
| Rate limiting & security hardening | 8 | ₹1,500 | ₹12,000 |
| API optimization & caching | 12 | ₹1,500 | ₹18,000 |
| **Frontend Development** | | | |
| Landing page polish & animations | 12 | ₹1,500 | ₹18,000 |
| Property detail page with gallery | 16 | ₹1,500 | ₹24,000 |
| Mobile responsiveness testing | 8 | ₹1,500 | ₹12,000 |
| Performance optimization | 8 | ₹1,500 | ₹12,000 |
| **AI Integration** | | | |
| AI response quality tuning | 12 | ₹1,500 | ₹18,000 |
| RAG implementation (property knowledge base) | 20 | ₹1,500 | ₹30,000 |
| Requirement extraction improvement | 8 | ₹1,500 | ₹12,000 |
| **DevOps** | | | |
| Docker containerization | 8 | ₹1,500 | ₹12,000 |
| CI/CD pipeline setup | 8 | ₹1,500 | ₹12,000 |
| Server provisioning & Nginx config | 6 | ₹1,500 | ₹9,000 |
| Monitoring setup | 4 | ₹1,500 | ₹6,000 |
| **Subtotal Development** | **168 hrs** | | **₹2,67,000** |

### 4.2 Testing & QA (One-Time)

| Task | Hours | Rate (₹/hr) | Cost (₹) |
|------|-------|-------------|----------|
| Unit testing | 12 | ₹1,200 | ₹14,400 |
| Integration testing | 8 | ₹1,200 | ₹9,600 |
| Load testing (50–100 users) | 6 | ₹1,200 | ₹7,200 |
| Security audit | 8 | ₹1,200 | ₹9,600 |
| **Subtotal QA** | **34 hrs** | | **₹40,800** |

### 4.3 Documentation (One-Time)

| Task | Cost (₹) |
|------|----------|
| API documentation | ₹5,000 |
| Deployment runbook | ₹4,000 |
| User guide | ₹3,000 |
| Architecture diagrams | ₹3,000 |
| **Subtotal Docs** | **₹15,000** |

---

## 5. Third-Party Services

### 5.1 Monthly Services

| Service | Tier | Monthly (₹) | Monthly ($) |
|---------|------|-------------|-------------|
| **Domain** | real.ivislabs.in (subdomain) | ₹0 | $0 |
| **Cloudflare** | Free (CDN + DDoS) | ₹0 | $0 |
| **SSL** | Let's Encrypt (auto-renew) | ₹0 | $0 |
| **UptimeRobot** | Free (50 monitors) | ₹0 | $0 |
| **Sentry** | Free (5K errors/month) | ₹0 | $0 |
| **GitHub** | Free (public/private repos) | ₹0 | $0 |
| **Email (SMTP)** | SendGrid (100 emails/day free) | ₹0 | $0 |
| **Analytics** | Google Analytics / Plausible | ₹0–850 | $0–10 |
| **SMS Notifications** (optional) | MSG91 / Twilio | ₹850 | $10 |
| **Subtotal** | | **₹850–1,700** | **$10–20** |

### 5.2 One-Time Services

| Service | Cost (₹) |
|---------|----------|
| Domain registration (if new) | ₹800/year |
| Google Workspace (optional) | ₹1,500/year |

---

## 6. Operational Costs

### 6.1 Monthly Maintenance

| Item | Hours/Month | Rate (₹/hr) | Monthly (₹) |
|------|------------|-------------|-------------|
| Server maintenance & updates | 2 | ₹1,500 | ₹3,000 |
| Bug fixes & minor improvements | 4 | ₹1,500 | ₹6,000 |
| Database backup verification | 1 | ₹1,500 | ₹1,500 |
| Security patches | 1 | ₹1,500 | ₹1,500 |
| Monitoring & alerts response | 2 | ₹1,500 | ₹3,000 |
| **Subtotal (Option A — minimal)** | **4 hrs** | | **₹4,200** |
| **Subtotal (Option B/C — full)** | **10 hrs** | | **₹8,300** |

---

## 7. One-Time Setup Costs

### Complete Breakdown

| Category | Cost (₹) | Cost ($) |
|----------|----------|----------|
| Backend Development | ₹1,24,000 | $1,494 |
| Frontend Development | ₹66,000 | $795 |
| AI Integration | ₹60,000 | $723 |
| DevOps & Infrastructure | ₹39,000 | $470 |
| Testing & QA | ₹40,800 | $492 |
| Documentation | ₹15,000 | $181 |
| **Total One-Time** | **₹3,44,800** | **$4,155** |

---

## 8. Monthly Recurring Costs

### Micro Split — Option B (Recommended)

| # | Line Item | Monthly (₹) | % of Total |
|---|-----------|-------------|-----------|
| 1 | App Server 1 (4CPU/8GB) | ₹1,660 | 8.0% |
| 2 | App Server 2 (4CPU/8GB) | ₹1,660 | 8.0% |
| 3 | DB Server Primary (2CPU/4GB) | ₹1,660 | 8.0% |
| 4 | DB Replica (2CPU/4GB) | ₹1,250 | 6.0% |
| 5 | Object Storage (S3 — 50GB) | ₹420 | 2.0% |
| 6 | Load Balancer | ₹830 | 4.0% |
| 7 | Backup Storage | ₹420 | 2.0% |
| 8 | **Infrastructure Subtotal** | **₹7,900** | **38.0%** |
| | | | |
| 9 | IVIS LABS AI API (30K req/mo) | ₹2,500 | 12.0% |
| 10 | **AI Subtotal** | **₹2,500** | **12.0%** |
| | | | |
| 11 | Analytics (Plausible/GA) | ₹850 | 4.1% |
| 12 | SMS Notifications (MSG91) | ₹850 | 4.1% |
| 13 | **Third-Party Subtotal** | **₹1,700** | **8.2%** |
| | | | |
| 14 | Server maintenance (2 hrs) | ₹3,000 | 14.4% |
| 15 | Bug fixes (4 hrs) | ₹6,000 | 28.8% |
| 16 | Backup verification (1 hr) | ₹1,500 | 7.2% |
| 17 | Security patches (1 hr) | ₹1,500 | 7.2% |
| 18 | Monitoring response (2 hrs) | ₹3,000 | 14.4% |
| 19 | **Operations Subtotal** | **₹8,300** | **39.9%** |
| | | | |
| | **GRAND TOTAL** | **₹20,800** | **100%** |
| | **USD Equivalent** | **~$251** | |

### Cost Distribution Chart

```
Infrastructure  ████████████████████  38.0%  (₹7,900)
Operations      ████████████████████  39.9%  (₹8,300)
AI API          ██████                12.0%  (₹2,500)
Third-Party     ████                   8.2%  (₹1,700)
Misc/Buffer     █                      1.9%  (₹400)
                ─────────────────────────────
                Total: ₹20,800/month
```

---

## 9. Annual Budget Projection

### Year 1 — Full Breakdown

| Quarter | Infra (₹) | AI (₹) | Ops (₹) | Services (₹) | Quarterly (₹) |
|---------|-----------|---------|---------|--------------|---------------|
| Q1 (Setup) | ₹6,240 + ₹3,44,800* | ₹7,500 | ₹12,600 | ₹2,550 | ₹3,73,690 |
| Q2 (Growth) | ₹23,700 | ₹7,500 | ₹24,900 | ₹5,100 | ₹61,200 |
| Q3 (Scale) | ₹23,700 | ₹10,000 | ₹24,900 | ₹5,100 | ₹63,700 |
| Q4 (Stable) | ₹23,700 | ₹10,000 | ₹24,900 | ₹5,100 | ₹63,700 |

*Q1 includes one-time setup cost of ₹3,44,800*

| | Annual (₹) | Annual ($) |
|---|-----------|-----------|
| **Year 1 Total** | **₹5,62,290** | **~$6,774** |
| **Year 2 Projected (recurring only)** | **₹2,52,600** | **~$3,043** |

### Per-User Cost Analysis

| Metric | Value |
|--------|-------|
| Monthly active users (est.) | 500–1,000 |
| Monthly cost | ₹20,800 |
| **Cost per active user** | **₹21–42/month ($0.25–0.50)** |
| Cost per property listed | ~₹50 ($0.60) |
| Cost per AI interaction | ~₹0.08 ($0.001) |

---

## 10. Cost Optimization Strategies

| Strategy | Savings | Effort |
|----------|---------|--------|
| Use Hetzner instead of DO/AWS | 30–50% on infra | Low |
| Reserved instances (1-yr commit) | 20–40% on compute | Low |
| Cloudflare caching for images | 40% on bandwidth | Low |
| AI response caching (Redis) | 30–50% on AI costs | Medium |
| Self-host AI model (at scale) | 70% on AI costs | High |
| Reduce PM2 workers in off-hours | 10% on compute | Low |
| Use spot/preemptible instances | 60–70% on compute | Medium |
| Compress images on upload | 30% on storage | Low |

**Quick wins (save ~₹5,000/month):**
1. Use Hetzner VPS (₹1,660 savings)
2. Enable Cloudflare image caching (₹1,000 savings)
3. Add Redis AI cache (₹2,500 savings on AI calls)

---

## 11. Budget by Phase

### Phase 1: MVP Launch (Month 1–2)

| Item | Cost (₹) |
|------|----------|
| Development (one-time) | ₹3,44,800 |
| Single VPS (Option A) | ₹4,160 |
| AI API | ₹5,000 |
| **Phase 1 Total** | **₹3,53,960** |

### Phase 2: Production Hardening (Month 3–4)

| Item | Cost (₹) |
|------|----------|
| PostgreSQL migration | ₹24,000 |
| S3 integration | ₹18,000 |
| Multi-server setup (Option B) | ₹15,800 |
| Load testing | ₹7,200 |
| Security audit | ₹9,600 |
| **Phase 2 Total** | **₹74,600** |

### Phase 3: Scale & Optimize (Month 5–6)

| Item | Cost (₹) |
|------|----------|
| Redis caching layer | ₹12,000 |
| RAG implementation | ₹30,000 |
| CDN optimization | ₹6,000 |
| Monthly infra (2 months) | ₹15,800 |
| Monthly ops (2 months) | ₹16,600 |
| **Phase 3 Total** | **₹80,400** |

### Phase 4: Steady State (Month 7+)

| Item | Monthly (₹) | Annual (₹) |
|------|-------------|-----------|
| Infrastructure | ₹7,900 | ₹94,800 |
| AI API | ₹2,500 | ₹30,000 |
| Operations | ₹8,300 | ₹99,600 |
| Third-party | ₹1,700 | ₹20,400 |
| **Monthly** | **₹20,400** | **₹2,44,800** |

---

### Total Investment Summary

| Period | Cost (₹) | Cost ($) |
|--------|----------|----------|
| Phase 1 — MVP Launch | ₹3,53,960 | $4,265 |
| Phase 2 — Production | ₹74,600 | $899 |
| Phase 3 — Scale | ₹80,400 | $969 |
| Phase 4 — Year 1 remainder (6 mo) | ₹1,22,400 | $1,475 |
| **Year 1 Grand Total** | **₹6,31,360** | **$7,607** |
| **Year 2 (recurring)** | **₹2,44,800** | **$2,949** |

---

*Pricing estimates as of February 2026. Actual costs may vary based on provider, region, and usage patterns. All rates assume Indian market pricing where applicable.*

*Document prepared by IVIS LABS Engineering Team — February 2026*
