# IVIS Property Listings — End-to-End System Design

**Version:** 1.0
**Date:** February 2026
**Target:** Production-ready platform handling 50–100 concurrent requests
**Prepared for:** IVIS LABS

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Component Design](#3-component-design)
4. [Hardware & Infrastructure Specifications](#4-hardware--infrastructure-specifications)
5. [Network Architecture](#5-network-architecture)
6. [Database Design](#6-database-design)
7. [AI/ML Pipeline](#7-aiml-pipeline)
8. [Security Architecture](#8-security-architecture)
9. [CI/CD Pipeline](#9-cicd-pipeline)
10. [Monitoring & Observability](#10-monitoring--observability)
11. [Scaling Strategy](#11-scaling-strategy)
12. [Disaster Recovery & Backup](#12-disaster-recovery--backup)
13. [Capacity Planning](#13-capacity-planning)
14. [Deployment Topology](#14-deployment-topology)

---

## 1. Executive Summary

IVIS Property Listings is an AI-powered property discovery platform with a WhatsApp-style chat interface. Users can search, list, and browse properties through natural language. The system integrates an AI inference engine (granite3.1-dense), image storage, and a real-time chat experience.

**Design Goals:**
- Handle 50–100 concurrent users with <500ms API response times
- 99.9% uptime SLA (8.76 hours downtime/year)
- Horizontal scalability to 500+ concurrent users when needed
- Secure, GDPR-aware data handling
- Cost-efficient infrastructure (cloud-native)

---

## 2. System Architecture Overview

```
                           ┌─────────────────────────┐
                           │      USERS (Browser)     │
                           │   50–100 Concurrent      │
                           └────────────┬────────────┘
                                        │ HTTPS
                                        ▼
                           ┌─────────────────────────┐
                           │     CDN / Edge Cache     │
                           │   (CloudFlare / AWS CF)  │
                           │   Static assets, images  │
                           └────────────┬────────────┘
                                        │
                                        ▼
                           ┌─────────────────────────┐
                           │   Load Balancer (Nginx)  │
                           │   SSL Termination        │
                           │   Rate Limiting          │
                           └──────┬──────────┬───────┘
                                  │          │
                    ┌─────────────▼──┐   ┌──▼─────────────┐
                    │  Frontend (S3/ │   │  Backend API    │
                    │  Nginx static) │   │  (Node/Express) │
                    │  React SPA     │   │  x2 instances   │
                    └────────────────┘   └──────┬──────────┘
                                                │
                          ┌─────────────────────┼─────────────────────┐
                          │                     │                     │
                    ┌─────▼──────┐   ┌─────────▼────────┐   ┌───────▼──────┐
                    │ PostgreSQL │   │  Object Storage   │   │  AI Service  │
                    │ Database   │   │  (S3/MinIO)       │   │  Proxy       │
                    │ Primary +  │   │  Property images  │   │  → IVIS LABS │
                    │ Replica    │   │                   │   │  API         │
                    └────────────┘   └───────────────────┘   └──────────────┘
```

**Architecture Style:** 3-tier (Presentation → Application → Data)
**Communication:** REST API (JSON over HTTPS)
**Deployment:** Containerized (Docker) on VPS/Cloud

---

## 3. Component Design

### 3.1 Frontend (React SPA)

| Aspect | Detail |
|--------|--------|
| Framework | React 18 |
| Build | react-scripts (CRA) → production build |
| Hosting | Nginx static server or S3 + CloudFront |
| Bundle Size | ~200KB gzipped (estimated) |
| Caching | CDN edge cache, 1-hour TTL for assets |
| Features | Landing page, chat UI, property cards, image galleries, forms |

**Performance Targets:**
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Score: >85

### 3.2 Backend API (Node.js / Express)

| Aspect | Detail |
|--------|--------|
| Runtime | Node.js 18 LTS |
| Framework | Express 4.x |
| Process Manager | PM2 (cluster mode, 2–4 workers) |
| File Uploads | Multer (10MB limit, image-only filter) |
| Rate Limiting | express-rate-limit (100 req/min per IP) |
| CORS | Whitelist: real.ivislabs.in |

**API Endpoints:**

| Method | Endpoint | Purpose | Avg Response |
|--------|----------|---------|-------------|
| GET | /api/health | Health check | <10ms |
| GET | /api/properties | List all properties | <50ms |
| GET | /api/properties/:id | Single property | <30ms |
| POST | /api/properties | Create listing + upload images | <2s |
| DELETE | /api/properties/:id | Remove listing | <50ms |
| POST | /api/chat | AI proxy (→ IVIS LABS API) | 1–5s |

### 3.3 AI Chat Proxy

| Aspect | Detail |
|--------|--------|
| Upstream | chat.ivislabs.in/api/chat/completions |
| Model | granite3.1-dense:latest |
| Timeout | 30 seconds |
| Retry | 1 retry on 5xx |
| Auth | Bearer token (x-api-key header from client) |

### 3.4 Data Storage (Current → Production Migration)

| Current | Production |
|---------|-----------|
| JSON file (properties.json) | PostgreSQL 15 |
| Local disk (server/uploads/) | S3-compatible object storage |

---

## 4. Hardware & Infrastructure Specifications

### 4.1 Recommended Setup for 50–100 Concurrent Users

#### Option A: Single VPS (Budget — Starter)

| Resource | Specification |
|----------|--------------|
| **Server** | 1x VPS |
| CPU | 4 vCPU (AMD EPYC / Intel Xeon) |
| RAM | 8 GB DDR4 |
| Storage | 100 GB NVMe SSD |
| Bandwidth | 4 TB/month |
| OS | Ubuntu 22.04 LTS |
| Location | Mumbai / Bangalore DC |

**Software Stack on Single Server:**
```
┌──────────────────────────────────┐
│           Nginx (reverse proxy)  │
│           SSL + rate limiting    │
├──────────────────────────────────┤
│  PM2 → Node.js Backend (x2)     │
│  Port 5000, 5001                 │
├──────────────────────────────────┤
│  React Build (static, via Nginx) │
├──────────────────────────────────┤
│  PostgreSQL 15                   │
├──────────────────────────────────┤
│  Local disk for uploads          │
│  (or MinIO for S3 compat)        │
└──────────────────────────────────┘
```

**Capacity:** Handles ~80 concurrent users
**Estimated Cost:** $20–40/month

#### Option B: Multi-Server (Production — Recommended)

| Server | Specs | Role | Qty |
|--------|-------|------|-----|
| **App Server** | 4 vCPU, 8GB RAM, 50GB SSD | Nginx + Node.js API (PM2 cluster) | 2 |
| **DB Server** | 2 vCPU, 4GB RAM, 100GB SSD | PostgreSQL (primary + streaming replica) | 2 |
| **Storage** | S3/MinIO | Object storage for images | 1 service |
| **Load Balancer** | Managed LB or Nginx | Traffic distribution | 1 |

**Capacity:** Handles 100+ concurrent users with failover
**Estimated Cost:** $80–150/month

#### Option C: Cloud-Managed (AWS / DigitalOcean)

| Service | Specification | Purpose |
|---------|--------------|---------|
| **Compute** | 2x t3.medium (2 vCPU, 4GB) | App servers behind ALB |
| **Database** | RDS db.t3.micro (2 vCPU, 1GB) | Managed PostgreSQL |
| **Storage** | S3 Standard | Image uploads |
| **CDN** | CloudFront | Static assets + image delivery |
| **LB** | Application Load Balancer | SSL + routing |

**Capacity:** Auto-scales to handle spikes
**Estimated Cost:** $100–200/month

### 4.2 Capacity Calculations

```
Assumptions:
- 100 concurrent users
- Average session: 5 minutes
- Messages per session: 10
- 20% of users upload images (avg 3 images × 2MB)

Requests/second:
- Chat messages: 100 users × 10 msgs / 300s = 3.3 req/s
- Property fetches: ~2 req/s
- Image uploads: ~0.5 req/s
- AI proxy calls: ~1.5 req/s
- Total: ~7.3 req/s peak → ~440 req/min

Memory (per Node.js worker):
- Base: ~80MB
- Per connection overhead: ~0.5MB
- 4 workers × 150MB = 600MB
- PostgreSQL: ~500MB
- Nginx: ~50MB
- OS overhead: ~500MB
- Total: ~1.7GB (fits comfortably in 4GB)

Storage (monthly growth):
- Properties: ~50 new/month × 3 images × 2MB = 300MB/month
- Database: ~10MB/month
- Growth rate: ~350MB/month
- 100GB disk supports ~24 months before cleanup needed

Network:
- Avg response size: 5KB (JSON) + 200KB (images)
- 440 req/min × 5KB = 2.2 MB/min text
- Image serves: ~100/min × 200KB = 20 MB/min
- Monthly bandwidth: ~1 TB (well within 4TB allowance)
```

---

## 5. Network Architecture

```
                    Internet
                        │
                   ┌────▼────┐
                   │  DNS     │  real.ivislabs.in → CDN
                   │(Cloudflare)│  realbackend.ivislabs.in → LB
                   └────┬────┘
                        │
               ┌────────▼────────┐
               │    Cloudflare   │
               │    WAF + CDN    │
               │    DDoS protect │
               └───┬─────────┬──┘
                   │         │
          Static   │         │  API
          assets   │         │  requests
                   ▼         ▼
            ┌──────────┐  ┌──────────────┐
            │  Nginx   │  │    Nginx     │
            │  (static │  │  (reverse    │
            │  files)  │  │   proxy)     │
            └──────────┘  └──────┬───────┘
                                 │
                          ┌──────▼───────┐
                          │   PM2 Node   │
                          │   Cluster    │
                          │  (2-4 workers)│
                          └──────┬───────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
              ┌──────────┐ ┌──────────┐ ┌──────────┐
              │PostgreSQL│ │  S3/Disk │ │ IVIS LABS│
              │          │ │  Images  │ │ Chat API │
              └──────────┘ └──────────┘ └──────────┘
```

**SSL:** Let's Encrypt (auto-renew via certbot)
**DNS:** Cloudflare (free tier — DDoS protection + CDN)
**Firewall:** UFW — only ports 80, 443, 22 open

---

## 6. Database Design

### 6.1 Schema (PostgreSQL)

```sql
-- Properties table
CREATE TABLE properties (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type            VARCHAR(50) NOT NULL,
    price           DECIMAL(15,2) NOT NULL,
    location        VARCHAR(255) NOT NULL,
    description     TEXT,
    amenities       TEXT,
    owner_name      VARCHAR(255) NOT NULL,
    contact_number  VARCHAR(20),
    status          VARCHAR(20) DEFAULT 'active',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Property images
CREATE TABLE property_images (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id     UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url       VARCHAR(500) NOT NULL,
    display_order   INT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Chat sessions (optional — for analytics)
CREATE TABLE chat_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token   VARCHAR(255),
    messages_count  INT DEFAULT 0,
    properties_viewed INT DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    last_active     TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_images_property ON property_images(property_id);
```

### 6.2 Migration Path

| Phase | Storage | Effort |
|-------|---------|--------|
| Current | JSON file + local disk | Done |
| Phase 1 | PostgreSQL + local disk | 2–3 days |
| Phase 2 | PostgreSQL + S3 object storage | 1–2 days |
| Phase 3 | Add Redis cache layer | 1 day |

---

## 7. AI/ML Pipeline

```
User Message
    │
    ▼
┌──────────────────┐
│ Intent Detection  │  (keyword matching — client-side)
│ list / search /   │
│ greet / general   │
└────────┬─────────┘
         │
    ┌────▼────┐        ┌──────────────────┐
    │ General │───────▶ │ AI Proxy (Backend)│
    │ Query   │        │ POST /api/chat    │
    └─────────┘        └────────┬─────────┘
                                │
                       ┌────────▼─────────┐
                       │ IVIS LABS API     │
                       │ granite3.1-dense  │
                       │ chat.ivislabs.in  │
                       └────────┬─────────┘
                                │
                       ┌────────▼─────────┐
                       │ Response to User  │
                       └──────────────────┘
```

**AI Use Cases:**

| Use Case | Method | Latency |
|----------|--------|---------|
| General chat | AI API call via proxy | 1–5s |
| Requirement extraction | AI API (JSON extraction prompt) | 2–4s |
| Fallback (API down) | Rule-based keyword matching | <10ms |
| Property search | Local filter on cached data | <50ms |

**Future Enhancements:**
- RAG (Retrieval Augmented Generation) with property embeddings
- Image-based property recommendations
- Price prediction model
- User preference learning

---

## 8. Security Architecture

### 8.1 Application Security

| Layer | Measure |
|-------|---------|
| Transport | TLS 1.3 (HTTPS everywhere) |
| CORS | Whitelist: real.ivislabs.in only |
| Input Validation | Server-side validation on all POST endpoints |
| File Uploads | Image-only filter (jpg/png/gif/webp), 10MB max |
| Rate Limiting | 100 req/min per IP (API), 10 req/min (upload) |
| Headers | Helmet.js (CSP, X-Frame, HSTS, etc.) |
| API Keys | Stored in env vars, never in client code |

### 8.2 Infrastructure Security

| Layer | Measure |
|-------|---------|
| Firewall | UFW: 80, 443, 22 (key-only SSH) |
| SSH | Key-based auth only, no root login |
| DDoS | Cloudflare proxy (free tier) |
| Secrets | Environment variables, not in git |
| Dependencies | npm audit, Dependabot alerts |
| Database | Private network only, no public access |

### 8.3 Data Protection

- No PII stored beyond owner name and contact (voluntarily provided)
- Image files served from isolated storage path
- Database backups encrypted at rest
- HTTPS enforced for all data in transit

---

## 9. CI/CD Pipeline

```
Developer Push
    │
    ▼
┌──────────────┐
│  GitHub Repo │
│  (main branch)│
└──────┬───────┘
       │ webhook
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Lint &     │────▶│   Build      │────▶│   Deploy     │
│   Test       │     │   React +    │     │   SSH/Docker  │
│   eslint     │     │   Docker     │     │   to server   │
└──────────────┘     └──────────────┘     └──────────────┘
```

**Tools:**
- GitHub Actions (CI/CD)
- Docker (containerization)
- PM2 (zero-downtime reload)

**Deploy Steps:**
```bash
# On server (automated via GitHub Actions)
git pull origin main
cd real
npm install --production
npm run build
pm2 reload all
```

---

## 10. Monitoring & Observability

| Tool | Purpose | Cost |
|------|---------|------|
| **PM2 Monitor** | Process health, restarts, CPU/memory | Free |
| **UptimeRobot** | Uptime monitoring (5-min intervals) | Free (50 monitors) |
| **Nginx Access Logs** | Request logging, error tracking | Free |
| **Cloudflare Analytics** | Traffic, threats, performance | Free |
| **Sentry** (optional) | Error tracking (frontend + backend) | Free (5K events/mo) |

**Health Check Endpoint:** `GET /api/health`
**Alert Channels:** Email + Slack webhook

---

## 11. Scaling Strategy

### Vertical Scaling (Phase 1 — current)

| From | To | When |
|------|----|------|
| 4 vCPU / 8GB | 8 vCPU / 16GB | >80% CPU sustained |

### Horizontal Scaling (Phase 2)

| Component | Strategy |
|-----------|----------|
| Backend API | Add more PM2 workers or additional server behind LB |
| Database | Read replicas for search queries |
| Images | CDN edge caching (Cloudflare) |
| Static Assets | Already CDN-served |

### Scaling Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU | >70% sustained 5min | Add worker / scale up |
| Memory | >80% | Scale up RAM |
| Response time | >2s (p95) | Add server instance |
| Disk | >80% | Archive old images to cold storage |
| Error rate | >1% | Investigate + alert |

---

## 12. Disaster Recovery & Backup

| Data | Backup Method | Frequency | Retention |
|------|--------------|-----------|-----------|
| Database | pg_dump to S3 | Daily | 30 days |
| Images | S3 cross-region replication | Real-time | Indefinite |
| Application code | Git (GitHub) | Every push | Indefinite |
| Config/Secrets | Encrypted backup | Weekly | 90 days |

**RTO (Recovery Time Objective):** 1 hour
**RPO (Recovery Point Objective):** 24 hours (daily backup)

**Recovery Procedure:**
1. Provision new server from latest snapshot
2. Restore database from latest pg_dump
3. Point DNS to new server
4. Verify with health check

---

## 13. Capacity Planning

### Year 1 Projections

| Month | Users/Day | Concurrent | Properties | Storage | Infra Tier |
|-------|-----------|-----------|------------|---------|------------|
| 1–3 | 50–100 | 20–30 | 100 | 5 GB | Option A |
| 4–6 | 200–500 | 50–80 | 500 | 20 GB | Option A |
| 7–9 | 500–1000 | 80–150 | 1,500 | 50 GB | Option B |
| 10–12 | 1000–2000 | 150–300 | 3,000 | 100 GB | Option B/C |

### When to Upgrade

| Trigger | Action |
|---------|--------|
| Sustained 100+ concurrent | Move to Option B (multi-server) |
| >5,000 properties | Add database indexing + caching |
| >50GB images | Move to S3 object storage |
| >300 concurrent | Add auto-scaling (Option C) |

---

## 14. Deployment Topology

### Production (Recommended — Option B)

```
┌──────────────────────────────────────────────────────────┐
│                    Cloudflare (CDN + WAF)                 │
└────────────────────────┬─────────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │  Nginx Load Balancer │
              │  (real.ivislabs.in)  │
              │  SSL Termination     │
              └────┬────────────┬───┘
                   │            │
         ┌─────────▼──┐  ┌────▼──────────┐
         │ App Server 1│  │ App Server 2  │
         │ PM2 (x2)   │  │ PM2 (x2)      │
         │ Node.js     │  │ Node.js       │
         │ 4CPU / 8GB  │  │ 4CPU / 8GB    │
         └──────┬──────┘  └──────┬────────┘
                │                │
         ┌──────▼────────────────▼──────┐
         │         Private Network       │
         └───┬──────────┬──────────┬────┘
             │          │          │
     ┌───────▼──┐  ┌───▼──────┐  ┌▼──────────┐
     │PostgreSQL│  │PostgreSQL│  │ S3/MinIO   │
     │ Primary  │  │ Replica  │  │ (Images)   │
     │ 2CPU/4GB │  │ 2CPU/4GB │  │            │
     └──────────┘  └──────────┘  └────────────┘
```

### Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.x |
| Backend | Node.js + Express | 18 LTS + 4.x |
| Database | PostgreSQL | 15.x |
| Cache | Redis (Phase 2) | 7.x |
| Process Manager | PM2 | 5.x |
| Web Server | Nginx | 1.24 |
| Containers | Docker | 24.x |
| CDN | Cloudflare | Free/Pro |
| Object Storage | S3 or MinIO | Latest |
| AI Engine | IVIS LABS API | granite3.1-dense |
| Monitoring | PM2 + UptimeRobot | Free tier |
| CI/CD | GitHub Actions | Free tier |

---

*Document prepared by IVIS LABS Engineering Team — February 2026*
