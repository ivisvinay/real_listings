# real_listings

## Repository Summary

**IVIS Property Listing Chatbot** — a WhatsApp-styled, AI-powered property listing and search application built with React.

### What It Does

- **Search properties** using natural language (e.g., "Show me villas in Bangalore under 50 lakhs")
- **List properties** through a conversational chatbot interface or embedded Google Forms
- **AI-powered** requirement extraction and property recommendations via IVIS LABS Chat API (granite3.1-dense model)
- **Google Sheets** backend for property data storage and retrieval
- **Google Forms** integration for property submission with email notifications via Apps Script

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, pure CSS (WhatsApp dark theme) |
| AI/ML | IVIS LABS Chat API / Open WebUI (granite3.1-dense) |
| Data | Google Sheets API v4, Google Forms |
| Deployment | Docker (multi-stage), Nginx |

### Project Structure

```
real_listings/
├── README.md
└── real/                          # Main application
    ├── public/index.html          # HTML entry point
    ├── src/
    │   ├── App.js                 # Main chat UI + conversation logic
    │   ├── App.css                # WhatsApp dark theme (610+ lines)
    │   ├── components/
    │   │   ├── ChatMessage.js     # Message bubble rendering
    │   │   └── PropertyForm.js    # Property listing form modal
    │   └── services/
    │       ├── aiService.js       # AI API integration + requirement extraction
    │       └── sheetsService.js   # Google Sheets data fetch + caching
    ├── package.json               # Dependencies
    ├── Dockerfile                 # Multi-stage Docker build
    ├── .env.example               # Environment variable template
    ├── google-apps-script-template.js  # Email notification script
    ├── ARCHITECTURE.md            # System architecture docs
    ├── PROJECT_DOCUMENTATION.md   # Full project documentation
    ├── PROPERTY_SEARCH_SETUP.md   # Google Sheets search setup
    ├── GOOGLE_FORMS_README.md     # Google Forms quick guide
    ├── GOOGLE_FORMS_SETUP.md      # Detailed Forms setup
    ├── SETUP.md                   # Quick start guide
    └── README.md                  # App-level docs
```

### Key Features

- **Intent recognition** — detects listing, searching, status check, and greeting intents from user messages
- **AI-powered search** — extracts property type, location, price range, and amenities from natural language queries
- **Dual form mode** — supports both embedded Google Forms and a custom inline form
- **5-minute data cache** — avoids excessive Google Sheets API calls
- **Responsive design** — optimized for both mobile and desktop
- **Simulated approval workflow** — demonstrates property listing → owner approval flow

### Repository Info

- **Owner:** ivisvinay
- **Initial commit:** Feb 6, 2026
