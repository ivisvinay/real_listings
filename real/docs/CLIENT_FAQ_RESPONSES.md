# IVIS Property Listings — Client Query Responses

**Version:** 1.0
**Date:** February 2026
**Prepared for:** Client Stakeholders
**Prepared by:** IVIS LABS Engineering Team

---

## Section 1: Listing & Data Handling

---

### Q1. How does the system ensure all required fields (price, location, size, type) are validated before publishing?

**Answer:**

Validation is enforced at **two layers** to ensure no incomplete listing goes live:

**Layer 1 — Frontend (User Interface)**
The property submission form enforces required fields with HTML5 validation and React-controlled inputs. The following fields are mandatory before the form can be submitted:

| Field | Validation Rule | Required |
|-------|----------------|----------|
| Property Type | Must select from: Apartment, Villa, House, Plot, Commercial, Office Space | Yes |
| Price (₹) | Must be a valid number | Yes |
| Location | Cannot be empty | Yes |
| Description | Cannot be empty | Yes |
| Owner Name | Cannot be empty | Yes |
| Contact Number | Phone format | No (recommended) |
| Images | Image files only (jpg, png, gif, webp), max 10MB each | No (recommended) |

The submit button remains disabled until all required fields are completed. Users receive inline error messages for any missing or invalid fields.

**Layer 2 — Backend (Server-side)**
The Express API independently validates every incoming request at `POST /api/properties`:

```
Required: type, price, location, ownerName
→ If any are missing → HTTP 400: "Missing required fields"
→ File uploads filtered → only image MIME types allowed (jpeg, jpg, png, gif, webp)
→ File size enforced → 10MB per image, max 10 images
```

**No listing is stored or published unless both layers pass.** This dual-layer approach ensures data integrity even if a client bypasses the frontend (e.g., via direct API calls).

**Production Roadmap:**
- Size/area field addition (sq. ft.) — planned
- Price range validation (minimum thresholds to prevent test data)
- Geolocation validation (pin verification against known cities)
- Image quality checks (minimum resolution, duplicate detection)

---

### Q2. At what stage does a human agent review or approve a listing before it goes live?

**Answer:**

**Current State:**
In the current version, listings go live immediately upon submission. This is by design for the MVP/demo phase to provide a frictionless user experience and demonstrate real-time AI capabilities.

**Production Roadmap — Moderated Listing Flow:**

We have designed a **three-stage approval pipeline** for production deployment:

```
Stage 1: SUBMISSION          Stage 2: REVIEW           Stage 3: LIVE
┌──────────────┐         ┌──────────────────┐       ┌──────────────┐
│ User submits │────────▶│ Auto-screening   │──────▶│ Admin review  │
│ via chatbot  │         │ (AI + rules)     │       │ (human agent) │
│              │         │                  │       │               │
│ Status:      │         │ Status:          │       │ Status:       │
│ "draft"      │         │ "pending_review" │       │ "active"      │
└──────────────┘         └──────────────────┘       └──────────────┘
                                │
                                │ Auto-reject if:
                                │ • Inappropriate images
                                │ • Spam/duplicate content
                                │ • Prohibited listings
                                ▼
                         ┌──────────────┐
                         │  "rejected"  │
                         │  + reason    │
                         └──────────────┘
```

**Stage 1 — Auto-Screening (Instant):**
- AI content moderation scans description text for spam, prohibited terms, and suspicious patterns
- Image moderation API flags inappropriate or irrelevant images
- Duplicate detection compares against existing listings (location + price + type)
- Price sanity check (flags unrealistically low or high values for the area)

**Stage 2 — Human Review (Admin Dashboard):**
- Qualified listings enter a review queue visible on an admin dashboard
- Human agent verifies: accuracy of details, image quality, legitimacy of contact info
- Agent can: Approve, Reject (with reason), or Request Changes
- Target SLA: Review within 2 hours during business hours

**Stage 3 — Publishing:**
- Approved listings become "active" and visible to all users
- Owner receives confirmation notification
- Listing appears in search results and AI recommendations

This pipeline can be configured per client — some may prefer instant publishing with post-moderation, while others may require strict pre-approval.

---

### Q3. Does the system support verifying property ownership or authorization before listing?

**Answer:**

**Current State:**
The current system collects owner name and contact number as self-declared information. This is standard for the initial listing phase.

**Production Roadmap — Ownership Verification:**

We recommend a **tiered verification model**:

| Tier | Verification Level | Method | Badge |
|------|--------------------|--------|-------|
| **Basic** | Phone verified | OTP via SMS/WhatsApp | ✓ Phone Verified |
| **Standard** | Identity verified | Government ID upload (Aadhaar/PAN) + AI OCR matching | ✓ Identity Verified |
| **Premium** | Ownership verified | Property document upload (sale deed, tax receipt, encumbrance certificate) + manual review | ✓ Ownership Verified |

**Implementation Approach:**

1. **Phone Verification (Phase 1):** OTP sent to listed contact number via WhatsApp Business API or SMS gateway. This is the minimum recommended verification.

2. **Identity Verification (Phase 2):** Integration with DigiLocker or third-party KYC APIs (e.g., Aadhaar verification via UIDAI sandbox). AI-powered OCR extracts and cross-references name from uploaded ID documents.

3. **Ownership Verification (Phase 3):** Property document upload with manual review by trained agents. Cross-reference with state land records APIs where available (e.g., Karnataka Bhoomi, Tamil Nadu Patta).

**Verified listings will display trust badges**, and users can filter search results by verification level — increasing platform trust and conversion rates.

---

### Q4. How are listing updates handled (price changes, availability, removals)?

**Answer:**

**Current Capabilities:**
- **Removal:** The system supports listing deletion via `DELETE /api/properties/:id`, which also cleans up associated uploaded images from storage
- **Status tracking:** Each property has a `status` field (currently `active` by default)

**Production Roadmap — Full Lifecycle Management:**

```
         ┌──────────┐
         │  DRAFT   │  (saved but not published)
         └────┬─────┘
              │ submit
              ▼
         ┌──────────┐
         │  ACTIVE  │  (live, visible in search)
         └────┬─────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌──────────┐
│ PAUSED │ │ SOLD/  │ │ EXPIRED  │
│(temp   │ │ RENTED │ │(auto     │
│ hide)  │ │        │ │ after    │
└────────┘ └────────┘ │ 90 days) │
                      └──────────┘
```

| Operation | Method | Who Can Do It | Audit Logged |
|-----------|--------|---------------|-------------|
| **Edit price** | PUT /api/properties/:id | Owner, Admin | Yes — old value recorded |
| **Update description** | PUT /api/properties/:id | Owner, Admin | Yes |
| **Add/remove images** | PATCH /api/properties/:id/images | Owner, Admin | Yes |
| **Pause listing** | PATCH status → "paused" | Owner, Admin | Yes |
| **Mark as sold/rented** | PATCH status → "sold" | Owner, Admin | Yes |
| **Remove listing** | DELETE or status → "removed" | Owner, Admin | Yes |
| **Auto-expire** | Cron job (90-day check) | System | Yes |

**Key Features:**
- **Price change history:** Every price modification is logged with timestamp, enabling "Price reduced!" badges
- **Auto-expiry:** Listings older than 90 days are auto-paused; owner receives notification to renew or remove
- **Bulk operations:** Admin dashboard supports bulk status changes (e.g., remove all listings from a flagged user)
- **Real-time sync:** Changes reflect immediately in search results and AI responses

---

## Section 2: AI Behavior & Language

---

### Q5. How does the AI handle Arabic dialects, mixed-language input, and local real estate terminology?

**Answer:**

**Current AI Engine:**
The system uses the **granite3.1-dense** language model (served via IVIS LABS API at `chat.ivislabs.in`), which has multilingual capabilities.

**Language Handling Strategy:**

| Scenario | Handling | Example |
|----------|----------|---------|
| **English** | Full support — primary language | "Show me 2BHK in Bangalore" |
| **Arabic (MSA)** | Supported by granite3.1-dense | "أريد شقة في دبي" |
| **Arabic dialects (Gulf, Levantine, Egyptian)** | Supported with context — model handles dialectal variations | "أبي شقة في الرياض" (Gulf dialect) |
| **Mixed-language (code-switching)** | Supported — common in GCC markets | "I want شقة in جدة under 500K" |
| **Transliterated Arabic** | Supported with fallback | "Abgha shaqa fi Riyadh" |
| **Hindi/regional Indian** | Supported — for Indian market | "Bangalore mein villa dikhao" |

**Real Estate Terminology Handling:**

The AI system prompt is enriched with domain-specific context:

| Local Term | Standard Mapping |
|------------|-----------------|
| 2BHK, 3BHK | 2-bedroom, 3-bedroom apartment |
| Flat | Apartment |
| Plot, Site | Land parcel |
| Crore, Lakh | Indian numbering (1 Cr = 10M, 1L = 100K) |
| Duplex, Penthouse | Property sub-types |
| Ground floor, G+2 | Floor/storey specification |

**How It Works:**

1. **User sends message** in any language or mixed-language format
2. **AI proxy** forwards to granite3.1-dense with a system prompt that includes property context
3. **Model processes** the query, understanding intent regardless of language
4. **Fallback extraction:** If AI is unavailable, a rule-based keyword matcher handles common terms (English + transliterated) for property type, price, and location extraction
5. **Response** is generated in the same language the user used

**Production Enhancements:**
- Custom fine-tuning on GCC/Indian real estate conversation data
- Glossary injection in system prompt for market-specific terms
- Language detection to auto-set response language
- Arabic RTL (right-to-left) UI support in chat interface

---

### Q6. What happens when the AI encounters unclear, conflicting, or changing information during a conversation?

**Answer:**

The AI handles ambiguity through a **structured clarification approach:**

**Scenario 1 — Unclear Requirements:**

```
User: "I want something nice in a good area"
AI:   "I'd love to help! Could you tell me:
       • What type of property? (Apartment, Villa, House, Plot)
       • Which city or area are you interested in?
       • What's your budget range?
       This will help me find the best options for you."
```

The AI is instructed (via system prompt) to ask clarifying questions rather than guess when requirements are vague.

**Scenario 2 — Conflicting Information:**

```
User: "Show me villas under 20 lakhs in Bangalore"
AI:   "Villas in Bangalore typically start at ₹80 lakhs and above.
       I can show you:
       • Apartments under ₹20 lakhs in Bangalore
       • Plots under ₹20 lakhs in nearby areas
       • Villas in your budget in other cities
       Which would you prefer?"
```

When criteria conflict with market reality, the AI acknowledges the mismatch and offers realistic alternatives.

**Scenario 3 — Changing Requirements Mid-Conversation:**

```
User: "Show me apartments in Chennai"
AI:   [Shows Chennai apartments]
User: "Actually, I want villas in Bangalore"
AI:   [Switches context, shows Bangalore villas — no confusion]
```

Each user message is processed independently with the full property database context. The AI does not carry forward stale filters — it re-evaluates requirements from the latest message.

**Scenario 4 — AI Service Unavailable:**

```
If the AI API fails → automatic fallback to rule-based responses:
• Keyword extraction for property type, location, price
• Pre-defined response templates
• Users still get functional property search results
```

**Built-in Safeguards:**
- **30-second timeout** on AI responses — prevents indefinite waiting
- **Graceful fallback** — if the AI API returns an error, the system serves a helpful rule-based response instead of an error message
- **Context awareness** — the AI receives a summary of available properties, so it never recommends properties that don't exist in the system

---

## Section 3: Governance & Support

---

### Q7. Is there a full audit trail showing who created, edited, approved, and published each listing?

**Answer:**

**Current State:**
Each property record includes:
- `id` — unique identifier
- `createdAt` — timestamp of creation
- `status` — current status (active/inactive)
- `ownerName` — who submitted the listing

**Production Roadmap — Full Audit Trail:**

We have designed a comprehensive audit logging system for the production database:

```sql
-- Audit log table (production schema)
CREATE TABLE audit_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type     VARCHAR(50) NOT NULL,     -- 'property', 'user', 'image'
    entity_id       UUID NOT NULL,             -- ID of the affected record
    action          VARCHAR(50) NOT NULL,      -- 'created', 'updated', 'approved',
                                               -- 'rejected', 'deleted', 'published'
    actor_type      VARCHAR(20) NOT NULL,      -- 'user', 'admin', 'system'
    actor_id        UUID,                      -- Who performed the action
    actor_name      VARCHAR(255),              -- Human-readable name
    old_values      JSONB,                     -- Previous state (for updates)
    new_values      JSONB,                     -- New state (for updates)
    ip_address      INET,                      -- Source IP
    user_agent      TEXT,                      -- Browser/client info
    notes           TEXT,                      -- Rejection reason, admin notes
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_actor ON audit_log(actor_id);
CREATE INDEX idx_audit_date ON audit_log(created_at);
```

**What Gets Logged:**

| Event | Details Captured |
|-------|-----------------|
| **Listing created** | Who submitted, all field values, timestamp, IP |
| **Listing edited** | Who edited, old values vs. new values, field-level diff |
| **Images added/removed** | Which images, by whom, file metadata |
| **Price changed** | Old price → new price, who changed it, when |
| **Status changed** | Previous status → new status, reason |
| **Review action** | Approved/rejected, by which admin, review notes |
| **Listing published** | Final publish timestamp, approver ID |
| **Listing removed** | Who removed, reason, whether user-initiated or admin action |
| **Login/access** | Admin login events, dashboard access |

**Audit Features:**
- **Immutable log** — audit records cannot be edited or deleted (append-only)
- **Searchable** — filter by entity, actor, date range, or action type
- **Exportable** — CSV/PDF export for compliance reporting
- **Retention** — 3 years minimum (configurable per regulatory requirements)
- **Admin dashboard view** — timeline view showing complete lifecycle of any listing

---

### Q8. If we or our client face a critical production issue, what is the guaranteed response time, available support channels, and escalation process during nights or weekends?

**Answer:**

**Support Tiers & SLA:**

| Severity | Description | Response Time | Resolution Target |
|----------|-------------|---------------|-------------------|
| **P0 — Critical** | System completely down, all users affected | **15 minutes** | 2 hours |
| **P1 — High** | Major feature broken (e.g., cannot submit listings, AI not responding) | **30 minutes** | 4 hours |
| **P2 — Medium** | Non-critical feature issue (e.g., image upload slow, UI glitch) | **2 hours** | 24 hours |
| **P3 — Low** | Minor issue, cosmetic, feature request | **8 hours (business)** | Next sprint |

**Available Support Channels:**

| Channel | Availability | Best For |
|---------|-------------|----------|
| **WhatsApp Support Group** | 24/7 | P0/P1 — fastest response |
| **Email** (support@ivislabs.in) | 24/7 (monitored) | P2/P3, documentation |
| **Phone (Direct)** | Business hours + on-call | P0 escalation |
| **Ticketing System** | 24/7 | Tracking, history, SLA compliance |
| **Slack/Teams Channel** | Business hours | Development collaboration |

**Escalation Process:**

```
Time 0:        Alert detected (automated monitoring) or client reports
                   │
                   ▼
Minutes 0–15:   L1 On-Call Engineer notified (WhatsApp + phone)
                • Acknowledges issue
                • Begins diagnosis
                   │
                   ▼
Minutes 15–30:  If not resolved → L2 Escalation
                • Senior Engineer / Backend Lead
                • Access to all production systems
                   │
                   ▼
Minutes 30–60:  If not resolved → L3 Escalation
                • Engineering Manager + CTO
                • War room mode (all hands)
                   │
                   ▼
Hour 1–2:       If not resolved → Executive Escalation
                • Client Account Manager informed
                • External vendor support engaged (if infra issue)
                • Interim workaround deployed if available
```

**Night & Weekend Coverage:**
- Automated monitoring (UptimeRobot, PM2) runs 24/7 — alerts trigger immediately on downtime
- On-call engineer rotation — one engineer always reachable via phone/WhatsApp
- Critical (P0) issues trigger auto-alert to the on-call engineer
- Post-incident: Root Cause Analysis (RCA) document delivered within 48 hours

**Proactive Monitoring:**
The system includes automated health checks that detect issues before clients do:
- `GET /api/health` — checked every 5 minutes
- CPU/memory threshold alerts
- Error rate spike detection
- AI API availability monitoring

---

### Q9. If Meta changes WhatsApp policies or enforces limitations, how quickly can the system adapt without impacting active clients?

**Answer:**

**Current Architecture Advantage:**

The system is designed as a **platform-independent web application**. The WhatsApp-style interface is a **UI theme**, not an actual WhatsApp Business API integration. This means:

> **The current system has ZERO dependency on Meta/WhatsApp infrastructure or policies.**

The chat interface runs entirely on our own servers (`real.ivislabs.in` + `realbackend.ivislabs.in`) as a web application. No WhatsApp Business API, no Meta Graph API, no WhatsApp Cloud API is used.

**This is a strategic advantage:**

| Concern | Impact on Our System |
|---------|---------------------|
| Meta changes WhatsApp Business API pricing | **No impact** — we don't use it |
| Meta enforces message template restrictions | **No impact** — our chat is web-based |
| Meta rate-limits WhatsApp bots | **No impact** — our AI runs independently |
| WhatsApp service outage | **No impact** — our platform stays online |
| Meta changes data sharing policies | **No impact** — all data on our servers |

**Future WhatsApp Integration (If Requested):**

If a client requires actual WhatsApp Business API integration (so users can chat with the bot directly from WhatsApp), we have a **multi-channel architecture plan:**

```
                    ┌───────────────┐
                    │   Web Chat    │ ← Current (always available)
                    │ (real.ivislabs)│
                    └──────┬────────┘
                           │
                    ┌──────▼────────┐
                    │  Unified      │
                    │  Message      │
                    │  Router       │
                    └──────┬────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼───┐  ┌────▼─────┐  ┌──▼──────────┐
       │ WhatsApp │  │ Telegram │  │  Instagram   │
       │ Business │  │ Bot API  │  │  Messaging   │
       │ API      │  │          │  │  API         │
       └──────────┘  └──────────┘  └──────────────┘
```

**Adaptation Strategy for Policy Changes:**

| Scenario | Response Time | Action |
|----------|---------------|--------|
| Minor policy update (template changes) | **24–48 hours** | Update message templates, test, deploy |
| Major policy change (API version deprecation) | **1–2 weeks** | Migrate to new API version, test across channels |
| WhatsApp blocks our use case | **Immediate** | Traffic routes to web chat (zero downtime for users) |
| New compliance requirement | **1 week** | Update data handling, add consent flows |

**Key Principle:** The web chat is always the **primary and fallback channel**. WhatsApp/Telegram/etc. are additional distribution channels. If any third-party channel goes down or changes policies, users can always access the full platform via the web interface with zero functionality loss.

---

## Summary

| Query Area | Current Status | Production-Ready |
|------------|---------------|-----------------|
| Field validation | Two-layer (frontend + backend) | Enhancing with geo + price sanity |
| Human review/approval | Instant publish (MVP) | Three-stage pipeline designed |
| Ownership verification | Self-declared | Tiered verification (OTP → ID → Docs) |
| Listing updates | Create + Delete | Full lifecycle (edit, pause, expire, sold) |
| Multilingual AI | granite3.1-dense (multilingual) | Adding fine-tuning + terminology |
| AI ambiguity handling | Clarification prompts + fallback | Context-aware + market knowledge |
| Audit trail | Timestamps + owner info | Full immutable audit log (JSONB) |
| Support SLA | Standard monitoring | P0: 15min response, 24/7 on-call |
| WhatsApp policy risk | Zero dependency (web-only) | Multi-channel architecture planned |

---

*Document prepared by IVIS LABS Engineering Team — February 2026*
*For questions, contact: support@ivislabs.in*
