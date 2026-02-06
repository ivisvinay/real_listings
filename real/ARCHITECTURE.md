# System Architecture

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         React Application                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                        App.js                              │ │
│  │  ┌──────────────────────────────────────────────────┐     │ │
│  │  │        State Management                           │     │ │
│  │  │  • messages[]                                     │     │ │
│  │  │  • inputText                                      │     │ │
│  │  │  • isTyping                                       │     │ │
│  │  │  • showPropertyForm                               │     │ │
│  │  │  • propertyData                                   │     │ │
│  │  └──────────────────────────────────────────────────┘     │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────┐     │ │
│  │  │        Conversation Logic                         │     │ │
│  │  │  • Intent Recognition                             │     │ │
│  │  │  • Message Processing                             │     │ │
│  │  │  • Workflow Management                            │     │ │
│  │  └──────────────────────────────────────────────────┘     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                      │
│          ┌────────────────┼────────────────┐                    │
│          ▼                ▼                ▼                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ ChatMessage  │ │ PropertyForm │ │  aiService   │           │
│  │  Component   │ │   Component  │ │   Service    │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│         │                 │                 │                    │
│         │                 │                 │                    │
└─────────┼─────────────────┼─────────────────┼────────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
    ┌──────────┐      ┌──────────┐     ┌──────────┐
    │   UI     │      │   Form   │     │   API    │
    │ Render   │      │   Data   │     │  Call    │
    └──────────┘      └──────────┘     └──────────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │  IVIS LABS API   │
                                    │  chat.ivislabs.in│
                                    └──────────────────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │  Granite 3.1     │
                                    │  Dense Model     │
                                    └──────────────────┘
```

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Property Listing Workflow                     │
└─────────────────────────────────────────────────────────────────┘

User Action                  System Response              Backend
─────────────────────────────────────────────────────────────────

1. User sends message
   "I want to list                                         
    my property"      ──────▶  Intent Recognition
                                     │
                                     ▼
                               Pattern Match:
                               ✓ "list"/"property"
                                     │
                                     ▼
                              Show Property Form
                                     │
                                     ▼
2. User fills form                                         
   • Type: Villa           Form Validation              
   • Price: ₹5,000,000           │                       
   • Location: Bangalore         ▼                       
   • Description...         Data Collection              
   • Images: 3 files             │                       
   • Video: 1 file               ▼                       
                           Store in State                
                                │                         
                                ▼                         
3. User clicks Submit                                    [Future]
                            Display Summary         ──▶  POST /api
                                │                        properties
                                ▼                             │
                         Simulate Approval                    │
                              Process                         │
                                │                             ▼
                                ▼                        DB Storage
                         "Forwarded to owner              MongoDB
                          for approval"                       │
                                │                             │
                                ▼                             ▼
                           Wait (2 sec)                 Owner Review
                                │                        Dashboard
                                ▼                             │
4. Approval simulation                                        │
                         "Owner confirmed!"                   │
                                │                             ▼
                                ▼                        Approval
                         "Uploading to                   Status
                          website..."                         │
                                │                             │
                                ▼                             ▼
5. Confirmation          Success Message              Publish to
                         ✅ "Everything              ──▶ Website
                         uploaded successfully!"          
                                                            
```

## Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                      Message Flow                             │
└──────────────────────────────────────────────────────────────┘

Input                Process              Storage           Output
─────────────────────────────────────────────────────────────────

User Types      ──▶  onChange()      ──▶  inputText     ──▶  Input
Message              Handler              State              Field
                        │
                        │ onSubmit()
                        ▼
                 addMessage()        ──▶  messages[]    ──▶  Chat
                 (user)                   Array             Bubble
                        │
                        │
                        ▼
              processUserMessage()
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
      Intent      AI Service    Direct
      Match         Call        Response
            │           │           │
            └───────────┼───────────┘
                        ▼
                 addMessage()        ──▶  messages[]    ──▶  Chat
                 (bot)                    Array             Bubble
                        │
                        ▼
              scrollToBottom()      ──▶  View          ──▶  Auto
                                          Update            Scroll
```

## API Communication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                  IVIS LABS API Integration                    │
└──────────────────────────────────────────────────────────────┘

Client Side                    Network                Server Side
─────────────────────────────────────────────────────────────────

aiService.js
    │
    ├─ getChatResponse(query)
    │       │
    │       ▼
    │   Build Request:
    │   {
    │     model: "granite3.1-dense:latest",
    │     messages: [
    │       {role: "system", content: "..."},
    │       {role: "user", content: query}
    │     ],
    │     temperature: 0.7,
    │     max_tokens: 500
    │   }
    │       │
    │       ▼
    │   fetch(url, {
    │     method: 'POST',
    │     headers: {
    │       'Authorization': `Bearer ${API_KEY}`,
    │       'Content-Type': 'application/json'
    │     },
    │     body: JSON.stringify(request)
    │   })
    │       │
    │       ├─────────────────▶  POST /chat/completions
    │       │                         │
    │       │                         ▼
    │       │                   Authenticate
    │       │                   (Bearer Token)
    │       │                         │
    │       │                         ▼
    │       │                   Process Request
    │       │                         │
    │       │                         ▼
    │       │                   Call Granite Model
    │       │                         │
    │       │                         ▼
    │       │                   Generate Response
    │       │                         │
    │       ◀─────────────────  Return JSON:
    │                           {
    │                             choices: [{
    │                               message: {
    │                                 role: "assistant",
    │                                 content: "..."
    │                               }
    │                             }]
    │                           }
    │       │
    │       ▼
    │   Parse Response
    │       │
    │       ▼
    │   Extract Content:
    │   data.choices[0].message.content
    │       │
    │       ▼
    │   Return to Caller
    │
    ▼
Display in Chat

Error Handling:
├─ Network Error    ──▶  Catch & Fallback Response
├─ Auth Error       ──▶  Catch & Fallback Response
└─ Invalid Response ──▶  Catch & Fallback Response
```

## State Management

```
┌──────────────────────────────────────────────────────────────┐
│                       React State                             │
└──────────────────────────────────────────────────────────────┘

State Variable        Type              Purpose
───────────────────────────────────────────────────────────────

messages              Array<Message>    Store conversation history
  └─ {
      id: number,
      text: string,
      sender: 'user' | 'bot',
      timestamp: Date
     }

inputText             string            Current message input

isTyping              boolean           Show typing indicator

showPropertyForm      boolean           Toggle form modal

propertyData          Object|null       Submitted property details
  └─ {
      type: string,
      price: string,
      location: string,
      description: string,
      amenities: string,
      ownerName: string,
      images: FileList,
      video: File
     }
```

## Component Hierarchy

```
App
├── WhatsApp Header
│   ├── Back Button
│   ├── Profile Picture
│   ├── Contact Info
│   │   ├── Contact Name
│   │   └── Status (Online/Typing)
│   └── Action Buttons
│       ├── Video Call
│       ├── Phone Call
│       └── Menu
│
├── Chat Background
│   ├── Messages Container
│   │   └── ChatMessage (map)
│   │       ├── Message Content
│   │       └── Message Time + Status
│   │
│   ├── Typing Indicator (conditional)
│   │   └── Animated Dots
│   │
│   ├── Property Form Modal (conditional)
│   │   ├── Form Header
│   │   │   ├── Title
│   │   │   └── Close Button
│   │   ├── Form Content
│   │   │   ├── Type Select
│   │   │   ├── Price Input
│   │   │   ├── Location Input
│   │   │   ├── Description Textarea
│   │   │   ├── Amenities Input
│   │   │   ├── Owner Name Input
│   │   │   ├── Images Upload
│   │   │   └── Video Upload
│   │   └── Form Actions
│   │       ├── Cancel Button
│   │       └── Submit Button
│   │
│   └── Quick Actions (conditional)
│       ├── List Property Button
│       ├── Check Status Button
│       └── Help Button
│
└── Input Container
    ├── Emoji Button
    ├── Attachment Button
    ├── Message Input
    └── Send/Voice Button (dynamic)
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Production Deployment                      │
└──────────────────────────────────────────────────────────────┘

Development                Build               Deployment
───────────────────────────────────────────────────────────────

Local Files         ──▶   npm run build   ──▶   Hosting Platform
├── src/                      │                  │
├── public/                   ▼                  │
└── package.json      Create /build/             │
                           │                     │
                           ├─ index.html         │
                           ├─ static/            │
                           │  ├─ css/            │
                           │  └─ js/             │
                           │                     │
                           └────────────────▶    │
                                                 │
Environment Variables                            │
REACT_APP_API_BASE_URL  ─────────────────────▶  │
REACT_APP_API_KEY                                │
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │   Netlify    │
                                          │      or      │
                                          │   Vercel     │
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │     CDN      │
                                          │  Distribution│
                                          └──────────────┘
                                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │    Users     │
                                          │   (Browser)  │
                                          └──────────────┘
```

---

**End of Architecture Documentation**
