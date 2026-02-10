# IVIS Property Listings — Client Query Responses

**Version:** 2.1
**Date:** February 2026
**Market:** Kingdom of Bahrain
**Prepared for:** Client Stakeholders
**Prepared by:** IVIS LABS Engineering Team

---

## Section 1: Listing & Data Handling

---

### Q1. How does the system ensure all required fields (price, location, size, type) are validated before publishing?

**Answer:**

Validation is enforced at **three layers** — designed for zero human intervention in the standard flow:

**Layer 1 — Conversational Validation (WhatsApp)**
When a user submits a listing via WhatsApp chat, the AI agent collects required fields conversationally and does not proceed until all mandatory fields are captured:

| Field | Validation Rule | Required |
|-------|----------------|----------|
| Property Type | Must match: Apartment (شقة), Villa (فيلا), House (بيت), Plot (أرض), Commercial (تجاري), Office (مكتب) | Yes |
| Price (BHD) | Must be a valid number in Bahraini Dinar | Yes |
| Location | Must match known Bahrain areas (Seef, Juffair, Amwaj, Riffa, Muharraq, Isa Town, Budaiya, Saar, Hamala, etc.) | Yes |
| Size (sq. m / sq. ft) | Must be numeric | Yes |
| Description | Cannot be empty | Yes |
| Owner Name | Cannot be empty | Yes |
| Contact Number | Bahrain phone format (+973 XXXX XXXX) | Yes |
| Images | Image files only (jpg, png, webp), max 10MB each | Recommended |

The AI agent prompts for missing fields naturally in the conversation — in Arabic or English depending on the user's language — eliminating the need for a traditional form.

**Layer 2 — Backend (Server-side)**
The Express API independently validates every incoming request at `POST /api/properties`:

```
Required: type, price, location, size, ownerName, contactNumber
→ Missing any field → HTTP 400: "Missing required fields"
→ Price must be > 0 BHD
→ Phone must match Bahrain format (+973)
→ File uploads → only image MIME types (jpeg, jpg, png, gif, webp)
→ File size → 10MB per image, max 10 images
```

**Layer 3 — AI Auto-Screening (Pre-Publish)**
Before the listing goes live, an automated AI check runs instantly (no human needed):

| Check | Rule | Action |
|-------|------|--------|
| Price sanity | Compares against market averages for area + type in Bahrain | Flag if >3x deviation |
| Duplicate detection | Location + price + type match within 5% | Block + notify owner |
| Image moderation | AI scans for inappropriate or irrelevant images | Auto-reject with reason |
| Content screening | Scans description for spam, prohibited terms | Auto-reject with reason |
| RERA compliance | Validates listing meets Bahrain RERA disclosure requirements | Flag if missing |

**No listing is stored or published unless all three layers pass.** This ensures data integrity with **zero human intervention** for valid submissions.

---

### Q2. At what stage does a human agent review or approve a listing before it goes live?

**Answer:**

The system is designed for **minimal human intervention**. The standard flow is fully automated:

```
AUTOMATED FLOW (95% of listings):

┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│ User submits │────▶│ AI Auto-Screen   │────▶│    LIVE      │
│ via WhatsApp │     │ (instant, <3sec) │     │  (published) │
│              │     │                  │     │              │
│              │     │ • Field complete │     │ Auto-notifies│
│ Status:      │     │ • Price sanity   │     │ owner via    │
│ "submitted"  │     │ • Image check    │     │ WhatsApp     │
│              │     │ • Duplicate scan │     │              │
│              │     │ • RERA compliance│     │ Status:      │
└──────────────┘     └──────────────────┘     │ "active"     │
                              │               └──────────────┘
                              │
                    AI flags anomaly?
                              │
                              ▼
                     ┌────────────────┐
                     │  EXCEPTION     │  ← Only ~5% of listings
                     │  QUEUE         │    reach this stage
                     │                │
                     │ Human reviews: │
                     │ • Flagged price│
                     │ • Duplicate?   │
                     │ • Suspicious   │
                     │   content      │
                     └────────┬───────┘
                              │
                    ┌─────────┼──────────┐
                    ▼         ▼          ▼
              ┌──────────┐ ┌─────────┐ ┌──────────────┐
              │ Approved │ │Rejected │ │ Request      │
              │ → LIVE   │ │+ reason │ │ Changes      │
              │          │ │(via WA) │ │ (via WA)     │
              └──────────┘ └─────────┘ └──────────────┘
```

**How It Works:**

1. **95% of listings** pass AI auto-screening and go live instantly — **zero human intervention**
2. **~5% of listings** get flagged for one or more anomalies and enter an exception queue
3. A human agent reviews **only flagged listings** from the admin dashboard
4. The owner is notified via WhatsApp at every stage (submission received, published, or flagged for review)

**AI Auto-Screening Capabilities:**

| Check | Method | Human Needed? |
|-------|--------|---------------|
| Missing fields | Rule-based validation | No |
| Price outlier | Statistical model (area × type × size) | No — auto-passes if within range |
| Duplicate listing | Fuzzy match on location + type + price | No — auto-blocks exact duplicates |
| Image quality | AI vision model | No — auto-rejects inappropriate |
| Spam/fraud text | NLP classification | No — auto-rejects spam patterns |
| RERA disclosure | Rule-based checklist | No — prompts user for missing info |
| Unusual pattern | Anomaly detection | **Yes — flags for human review** |

**Configurable Automation Level:**
The client can set the automation threshold:
- **Full Auto** — everything passes AI screening, no human queue (fastest)
- **Hybrid (Recommended)** — AI handles 95%, humans review flagged exceptions
- **Moderated** — all listings enter human queue after AI pre-screening (strictest)

---

### Q3. Does the system support verifying property ownership or authorization before listing?

**Answer:**

**Automated Verification Model — Designed for Bahrain:**

| Tier | Verification Level | Method | Badge | Human Needed? |
|------|--------------------|--------|-------|---------------|
| **Basic** | Phone verified | OTP via WhatsApp (automated) | ✓ Phone Verified | **No** |
| **Standard** | Identity verified | CPR (Central Population Registry) number + AI OCR of Bahraini ID card | ✓ Identity Verified | **No** |
| **Premium** | Ownership verified | Title deed upload + cross-reference with SLRB (Survey & Land Registration Bureau) records | ✓ Ownership Verified | Minimal (edge cases) |

**Implementation — Bahrain-Specific:**

1. **Phone Verification (Automated — Phase 1):**
   - OTP sent to listed contact number via WhatsApp Business API
   - User replies with OTP code in the same WhatsApp conversation
   - Entire flow is automated — no human involvement
   - Bahrain numbers validated against +973 format

2. **Identity Verification (Automated — Phase 2):**
   - User sends photo of Bahraini ID card (CPR) via WhatsApp
   - AI-powered OCR (Arabic + English) extracts name, CPR number, and nationality
   - Cross-references extracted name against the submitted owner name
   - Automatic match → verified. Mismatch → flagged for human review
   - Supports both Bahraini nationals and resident expat IDs

3. **Ownership Verification (Minimal Human — Phase 3):**
   - User uploads title deed or authorization letter via WhatsApp
   - AI OCR extracts property details (plot number, block, area)
   - Where available, cross-references with SLRB electronic records
   - AI match → auto-verified. Unclear → routed to human agent
   - Supports broker authorization (power of attorney / توكيل)

**Trust Badges on Listings:**
```
┌─────────────────────────────────────────┐
│ 🏠 3BR Villa in Amwaj Islands          │
│ BHD 180,000                             │
│                                         │
│ ✓ Phone Verified  ✓ ID Verified         │
│ ✓ Ownership Verified                    │
│                                         │
│ Trust Score: ████████░░ 85%             │
└─────────────────────────────────────────┘
```

Users can filter search results by verification level — increasing platform trust and conversion rates. Verified listings are prioritized in AI recommendations.

---

### Q4. How are listing updates handled (price changes, availability, removals)?

**Answer:**

All listing lifecycle operations are available **via WhatsApp conversation** — owners manage their listings without needing to visit a website or dashboard:

```
         ┌──────────┐
         │  DRAFT   │  (saved during conversation, not yet published)
         └────┬─────┘
              │ AI screening passes
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

**WhatsApp-Based Listing Management (No Dashboard Required):**

| Operation | How Owner Does It | Human Needed? |
|-----------|-------------------|---------------|
| **Update price** | Sends "Change price to BHD 150,000" on WhatsApp | **No** — AI processes it |
| **Update description** | Sends updated text | **No** — AI updates listing |
| **Add images** | Sends new photos on WhatsApp | **No** — auto-added to gallery |
| **Remove images** | "Remove photo 3" | **No** — AI removes specified image |
| **Pause listing** | "Hide my listing" / "أوقف الإعلان" | **No** — status → paused |
| **Mark as sold** | "Property is sold" / "تم البيع" | **No** — status → sold |
| **Reactivate** | "Show my listing again" | **No** — status → active |
| **Delete listing** | "Delete my listing" | **No** — confirmed via OTP, then removed |
| **Auto-expire** | System checks at 90 days | **No** — owner notified via WhatsApp to renew |

**Automated Notifications (via WhatsApp):**

| Event | Notification |
|-------|-------------|
| Listing goes live | "Your villa in Amwaj is now live! 🏠 View: [link]" |
| Someone inquires | "New inquiry about your property from Ahmed. Reply to connect." |
| Price reduced by owner | "Price updated to BHD 150,000. Listing refreshed in search." |
| 7 days before expiry | "Your listing expires in 7 days. Reply 'Renew' to extend." |
| Auto-expired | "Your listing has been paused. Reply 'Renew' to reactivate." |

**Key Features:**
- **Price change history:** Every price modification is logged with timestamp, enabling "Price Reduced!" badges
- **Bulk operations:** Admin dashboard supports bulk status changes for internal team
- **Real-time sync:** Changes via WhatsApp reflect immediately in search results and AI responses

---

## Section 2: AI Behavior & Language

---

### Q5. How does the AI handle Arabic dialects, mixed-language input, and local real estate terminology?

**Answer:**

The AI is designed to handle **Bahraini Arabic dialect, Gulf Arabic, and mixed-language text input** natively across WhatsApp conversations.

**Text Chat — Language Support Matrix:**

| Scenario | Handling | Example |
|----------|----------|---------|
| **English** | Full support | "Show me 2BR apartment in Juffair" |
| **Arabic (MSA)** | Full support | "أريد شقة في السيف" |
| **Bahraini dialect** | Full support (Gulf Arabic) | "أبي فلة في عمواج" |
| **Khaleeji slang** | Mapped to standard terms | "الديرة" → location, "حلو" → good quality |
| **Mixed Arabic-English** | Seamless switching | "I want شقة in الجفير under 500 BHD" |
| **Transliterated Arabic** | Supported | "Abi shaqa fi Seef" |
| **Hindi/Urdu** | Supported — large expat community in Bahrain | "Juffair mein apartment dikhao" |
| **Filipino/Tagalog basics** | Common phrases supported | For Bahrain's Filipino community |

**Bahrain Real Estate Terminology Mapping:**

The AI system prompt is enriched with Bahrain-specific real estate terminology:

| Local Term (Arabic) | Local Term (English) | Standard Mapping |
|---------------------|---------------------|-----------------|
| شقة (shaqqa) | Flat, Apartment | Apartment |
| فيلا / فلّة (filla) | Villa | Villa |
| بيت (bait) | House | House |
| أرض (ard) | Plot, Land | Plot |
| مكتب (maktab) | Office | Office Space |
| عمارة (imara) | Building | Residential Building |
| ستوديو (studio) | Studio | Studio Apartment |
| غرفة وصالة (ghurfa wa sala) | 1BR | 1 Bedroom |
| حوش (hosh) | Courtyard/Compound | Compound |
| دينار (dinar) / BHD | BHD | Bahraini Dinar |
| إيجار (ijar) | Rent | Rental |
| بيع (bay') | Sale | For Sale |
| مفروش (mafroosh) | Furnished | Furnished |
| RERA | RERA Bahrain | Real Estate Regulatory Authority |

**How It Works:**

1. **User sends text message** on WhatsApp in any language or mixed-language format
2. **WhatsApp Business API** delivers the message to our backend
3. **AI NLU Pipeline** detects language, extracts intent + entities (property type, location, budget)
4. **AI Agent** processes the request against the property database
5. **Response generated** in the same language the user used — Arabic users get Arabic replies, English users get English
6. **Sent back via WhatsApp** as a text message with property details, images, and action buttons

**Dialect-Specific Handling:**

| Challenge | Bahraini Example | How We Handle It |
|-----------|-----------------|-----------------|
| Gulf dialect expressions | "أبي" (abi) = "أريد" (I want) | NLU intent mapping trained on Gulf Arabic |
| Code-switching (Arabic ↔ English) | "أبي villa في Amwaj" | Multilingual NLU processes both seamlessly |
| Local place names | "الصخير", "عوالي", "الجفير" | Custom entity recognition for Bahrain neighborhoods |
| Colloquial real estate terms | "فلّة" (villa), "ديرة" (area), "حوش" (courtyard) | Terminology glossary injected into AI system prompt |
| Numbers in Arabic text | "مية وخمسين ألف" (150,000) | Arabic number normalization pipeline |

**Production Enhancements:**
- Custom fine-tuning on Bahraini real estate conversation data
- Entity recognition for Bahrain developer names (Diyar, Naseej, Reef Island, etc.)
- User preference memory — if user writes in Arabic, all future responses are in Arabic
- Arabic RTL (right-to-left) support in web chat interface

---

### Q6. What happens when the AI encounters unclear, conflicting, or changing information during a conversation?

**Answer:**

The AI handles ambiguity through a **structured clarification approach** — designed for natural WhatsApp conversation in Arabic or English:

**Scenario 1 — Unclear Requirements:**

```
User: "أبي شي حلو في مكان زين"
     (I want something nice in a good area)

AI:  "أهلاً! أقدر أساعدك 😊
      بس أحتاج أعرف:
      • شنو نوع العقار؟ (شقة، فيلا، بيت، أرض)
      • أي منطقة تفضل؟ (السيف، الجفير، عمواج، الرفاع...)
      • كم ميزانيتك بالدينار البحريني؟
      كل ما تقولي أكثر، أقدر أساعدك أحسن!"
```

The AI asks clarifying questions in the **same language and dialect** the user used — no forced language switching.

**Scenario 2 — Conflicting Information:**

```
User: "أبي فيلا بـ 50 ألف دينار في عمواج"
     (I want a villa for BHD 50,000 in Amwaj)

AI:  "الفلل في عمواج عادةً تبدأ من 150 ألف دينار بحريني وفوق.
      أقدر أساعدك بـ:
      • شقق في عمواج ضمن ميزانيتك
      • فلل بـ 50 ألف في الرفاع أو سار
      • أراضي في ميزانيتك بمناطق قريبة
      شنو تفضل؟"

     (Villas in Amwaj typically start from BHD 150K+.
      I can help with:
      • Apartments in Amwaj within your budget
      • Villas for BHD 50K in Riffa or Saar
      • Plots within your budget in nearby areas
      What do you prefer?)
```

When criteria conflict with **Bahrain market reality**, the AI acknowledges the mismatch and offers realistic local alternatives — without making the user feel wrong.

**Scenario 3 — Changing Requirements Mid-Conversation:**

```
User: "Show me apartments in Juffair"
AI:   [Shows Juffair apartments]
User: "Actually, I want villas in Amwaj"
AI:   [Switches context entirely, shows Amwaj villas — no confusion]
```

Each user message is processed independently with the full property database context. The AI does not carry forward stale filters.

**Scenario 4 — AI Service Unavailable:**

```
If the AI API fails → automatic fallback:
• Rule-based keyword extraction (Arabic + English)
• Pre-defined response templates in Arabic and English
• Users still get functional property search results
• Seamless — user doesn't know it's a fallback
```

**Built-in Safeguards:**
- **30-second timeout** on AI responses — prevents indefinite waiting
- **Graceful fallback** — rule-based responses serve immediately if AI is slow
- **Context awareness** — AI receives a summary of available Bahrain properties, so it never recommends properties that don't exist

---

## Section 3: Governance & Support

---

### Q7. Is there a full audit trail showing who created, edited, approved, and published each listing?

**Answer:**

Yes. The production system maintains a **complete, immutable audit trail** — critical for RERA Bahrain compliance and client governance requirements.

**Production Audit Log Schema:**

```sql
CREATE TABLE audit_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type     VARCHAR(50) NOT NULL,     -- 'property', 'user', 'image', 'verification'
    entity_id       UUID NOT NULL,
    action          VARCHAR(50) NOT NULL,      -- 'created', 'updated', 'auto_approved',
                                               -- 'flagged', 'human_approved', 'rejected',
                                               -- 'published', 'expired', 'deleted'
    actor_type      VARCHAR(20) NOT NULL,      -- 'user', 'admin', 'system', 'ai_agent'
    actor_id        UUID,
    actor_name      VARCHAR(255),
    channel         VARCHAR(20),               -- 'whatsapp', 'web', 'admin_dashboard'
    old_values      JSONB,
    new_values      JSONB,
    ai_confidence   DECIMAL(3,2),              -- AI screening confidence score
    ip_address      INET,
    whatsapp_number VARCHAR(20),               -- Source WhatsApp number
    notes           TEXT,                       -- Rejection reason, admin notes
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**What Gets Logged — Including Automated Actions:**

| Event | Details Captured | Actor Type |
|-------|-----------------|------------|
| **Listing submitted** | All field values, WhatsApp number, timestamp | user |
| **AI auto-screening passed** | Confidence scores, checks performed, result | ai_agent |
| **AI auto-screening flagged** | Which check failed, confidence score, reason | ai_agent |
| **Listing published (auto)** | Publish timestamp, AI approval scores | ai_agent |
| **Listing published (human)** | Approver name, review notes | admin |
| **Listing rejected** | Reason, by whom (AI or human), notification sent | ai_agent / admin |
| **Price changed** | Old price → new price, channel (WhatsApp/web) | user |
| **Images added/removed** | Which images, file metadata, channel | user |
| **Status changed** | Previous → new status, reason, channel | user / system |
| **Ownership verified** | Verification tier, documents checked, result | ai_agent / admin |
| **Auto-expired** | 90-day rule triggered, notification sent | system |
| **Listing removed** | Who requested, reason, confirmation method | user / admin |
| **Admin login** | Login timestamp, IP, user agent | admin |

**Key Features:**
- **Immutable** — audit records cannot be edited or deleted (append-only table, no UPDATE/DELETE permissions)
- **AI actions tracked** — every automated decision is logged with confidence scores, so you can audit AI behavior
- **Channel tracked** — shows whether action came from WhatsApp, web, or admin dashboard
- **Searchable** — filter by entity, actor, date range, action type, or channel
- **Exportable** — CSV/PDF export for RERA compliance reporting
- **Retention** — 5 years minimum (configurable per Bahrain regulatory requirements)
- **Dashboard view** — timeline showing complete lifecycle of any listing, including all AI and human decisions

**RERA Bahrain Compliance:**
The audit trail is designed to satisfy Bahrain's Real Estate Regulatory Authority requirements for property listing transparency, including who listed, when, what changed, and who approved.

---

### Q8. If we or our client face a critical production issue, what is the guaranteed response time, available support channels, and escalation process during nights or weekends?

**Answer:**

**Support Tiers & SLA (Bahrain Time — AST, UTC+3):**

| Severity | Description | Response Time | Resolution Target |
|----------|-------------|---------------|-------------------|
| **P0 — Critical** | System down, all users affected, WhatsApp bot unresponsive | **15 minutes** | 2 hours |
| **P1 — High** | Major feature broken (listings not publishing, AI not responding) | **30 minutes** | 4 hours |
| **P2 — Medium** | Non-critical issue (image upload slow, minor UI glitch) | **2 hours** | 24 hours |
| **P3 — Low** | Minor issue, cosmetic, feature request | **8 hours (business)** | Next sprint |

**Available Support Channels:**

| Channel | Availability | Best For |
|---------|-------------|----------|
| **WhatsApp Support Group** (dedicated to client) | **24/7** | P0/P1 — fastest response |
| **Email** (support@ivislabs.in) | 24/7 (monitored) | P2/P3, documentation, formal requests |
| **Phone (Direct — Bahrain local number)** | Business hours + on-call | P0 escalation |
| **Ticketing System** | 24/7 | Tracking, history, SLA compliance proof |

**Escalation Process (Bahrain Time):**

```
Time 0:        Alert detected (automated monitoring) or client reports via WhatsApp
                   │
                   ▼
Minutes 0–15:   L1 On-Call Engineer notified (WhatsApp + phone)
                • Acknowledges issue on client WhatsApp group
                • Begins diagnosis
                   │
                   ▼
Minutes 15–30:  If not resolved → L2 Escalation
                • Senior Engineer / Backend Lead
                • Access to all production systems
                • Client updated on WhatsApp with status
                   │
                   ▼
Minutes 30–60:  If not resolved → L3 Escalation
                • Engineering Manager + CTO
                • War room mode (all hands)
                • Client Account Manager joins WhatsApp group
                   │
                   ▼
Hour 1–2:       If not resolved → Executive Escalation
                • IVIS LABS leadership informed
                • External vendor support engaged (Meta/WhatsApp, cloud provider)
                • Interim workaround deployed (e.g., fallback to web chat if WhatsApp is down)
```

**Night & Weekend Coverage (Bahrain-Aligned):**
- Bahrain business hours: Sunday–Thursday, 8 AM – 5 PM AST
- Automated monitoring runs **24/7** — alerts trigger on any downtime or error spike
- On-call engineer rotation covers **Friday/Saturday** (Bahrain weekend) and nights
- P0 issues trigger **auto-alert** to on-call engineer within 1 minute
- Post-incident: Root Cause Analysis (RCA) document delivered within 48 hours

**Proactive Monitoring:**

| Monitor | Frequency | Alert Method |
|---------|-----------|-------------|
| API health check (`/api/health`) | Every 2 minutes | WhatsApp + SMS |
| WhatsApp Business API connectivity | Every 5 minutes | WhatsApp + SMS |
| AI API response time | Every 5 minutes | Email + dashboard |
| CPU/memory thresholds | Real-time | Auto-alert at 80% |
| Error rate spike | Real-time | Auto-alert at >1% |

---

### Q9. If Meta changes WhatsApp policies or enforces limitations, how quickly can the system adapt without impacting active clients?

**Answer:**

This is a critical concern since **WhatsApp Business API is the primary user channel**. Our architecture is specifically designed to **isolate Meta dependencies** and ensure continuity.

**WhatsApp Integration Architecture:**

```
┌──────────────────────────────────────────────────────────┐
│                    User Channels                          │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  WhatsApp   │  │  Web Chat   │  │  Telegram / SMS  │  │
│  │  (Primary)  │  │  (Fallback) │  │  (Future)        │  │
│  └──────┬──────┘  └──────┬──────┘  └───────┬─────────┘  │
└─────────┼────────────────┼─────────────────┼─────────────┘
          │                │                 │
          ▼                ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│              UNIFIED MESSAGE ROUTER                      │
│         (Channel-agnostic message processing)            │
│                                                          │
│  • Normalizes messages from all channels                 │
│  • Routes to AI agent pipeline                           │
│  • Formats responses per channel                         │
│  • Stores conversation in unified format                 │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              AI AGENT PIPELINE                            │
│         (Same logic regardless of channel)                │
│                                                          │
│  Intent Detection → Property Search → Response Gen       │
└─────────────────────────────────────────────────────────┘
```

**Key Design Principle:** The AI logic, property database, and business rules have **zero dependency on WhatsApp**. WhatsApp is treated as a **replaceable transport layer**.

**WhatsApp Business API Integration Details:**

| Component | Provider | Fallback |
|-----------|----------|----------|
| **WhatsApp BSP** (Business Solution Provider) | Primary: Meta Cloud API (direct) | Secondary: Twilio / 360dialog |
| **Message Templates** | Pre-approved templates for notifications | Web push notifications as fallback |
| **Media Handling** | WhatsApp media download API | Direct upload via web |
| **Phone Number** | Bahrain number (+973) registered with Meta | Same number, different BSP if needed |

**Adaptation Strategy for Meta Policy Changes:**

| Scenario | Impact | Response Time | Action |
|----------|--------|---------------|--------|
| **Template approval changes** | Notification messages affected | **24–48 hours** | Rewrite templates, resubmit for approval, use session messages in interim |
| **Pricing changes** (per-conversation fees) | Cost increase | **Immediate analysis, 1 week action** | Optimize message grouping, evaluate BSP alternatives, adjust pricing |
| **Rate limiting enforced** | High-volume sends throttled | **24 hours** | Implement message queuing, prioritize by severity, batch notifications |
| **API version deprecation** | Old endpoints stop working (Meta gives 12-month notice) | **2–4 weeks** (well before deadline) | Migrate to new API version, test, deploy |
| **24-hour conversation window changed** | Limits when we can message users | **1 week** | Adjust notification timing, use approved templates outside window |
| **WhatsApp blocks our number** | Total WhatsApp outage for our service | **< 1 hour** | Auto-failover to web chat + SMS notifications. Users get SMS: "Continue on web: [link]" |
| **Meta shuts down WhatsApp Business API** (extreme) | Full channel loss | **1 week** | Migrate to Telegram Bot API / SMS / web-only. All data and AI logic intact. |
| **New compliance requirement** (data residency, consent) | Must update data handling | **1–2 weeks** | Update consent flows, data storage location, privacy policy |

**BSP (Business Solution Provider) Flexibility:**

We use the WhatsApp Cloud API through a **BSP abstraction layer**, meaning we can switch providers without changing our application code:

```
Current:   Our Backend → Meta Cloud API (direct)
Backup 1:  Our Backend → Twilio WhatsApp API
Backup 2:  Our Backend → 360dialog API
Backup 3:  Our Backend → MessageBird API

All BSPs connect to the same WhatsApp number.
Switch time: < 4 hours (configuration change, no code change)
```

**Automatic Failover — Zero Downtime Guarantee:**

If WhatsApp becomes unavailable for any reason:

1. **Instant:** System detects WhatsApp API failure (health check every 5 minutes)
2. **< 5 minutes:** Users sending WhatsApp messages receive auto-reply: "We're temporarily available on web. Continue here: [web link]"
3. **< 1 hour:** SMS gateway activated — sends property notifications via SMS to Bahrain numbers
4. **Ongoing:** Web chat remains fully functional with all AI capabilities
5. **On recovery:** WhatsApp reconnected, pending messages delivered, users notified

**No user conversation data is lost** during a channel switch — all conversations are stored in our database, not in WhatsApp's infrastructure.

---

## Summary

| Query Area | Approach | Human Intervention |
|------------|----------|-------------------|
| Field validation | 3-layer: conversational + backend + AI screening | **None** — fully automated |
| Listing approval | AI auto-screening (95% auto-approved) | **Minimal** — only flagged exceptions |
| Ownership verification | Automated OTP + AI OCR of Bahraini CPR/title deed | **Minimal** — edge cases only |
| Listing updates | WhatsApp conversational commands | **None** — owner self-service via WhatsApp |
| Arabic dialect (text) | Multilingual NLU with Gulf Arabic + terminology glossary | **None** — fully automated |
| AI ambiguity handling | Clarification in same dialect + graceful fallback | **None** — AI handles all scenarios |
| Audit trail | Immutable log with AI confidence scores, RERA-compliant | **None** — auto-generated |
| Support SLA | P0: 15-min response, 24/7, Bahrain-aligned | Dedicated support team |
| WhatsApp policy risk | BSP abstraction + auto-failover to web + SMS | **< 1 hour** failover, no data loss |

---

*Document prepared by IVIS LABS Engineering Team — February 2026*
*Market: Kingdom of Bahrain*
*Currency: Bahraini Dinar (BHD)*
*For questions, contact: support@ivislabs.in*
