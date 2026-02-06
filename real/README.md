# IVIS Property Listing Chatbot - WhatsApp Style

A WhatsApp-style property listing chatbot built with React and integrated with IVIS LABS Chat API.

## Features

✅ **WhatsApp-like Interface**
- Authentic WhatsApp dark theme design
- Message bubbles with timestamps
- Typing indicators
- Quick action buttons

✅ **AI-Powered Conversations**
- Integrated with IVIS LABS Chat API (granite3.1-dense model)
- Natural language understanding
- Context-aware responses

✅ **Property Listing Workflow**
- Conversational property submission
- Structured form for property details
- Image and video upload support
- Owner approval simulation

✅ **Smart Features**
- Intent recognition (list property, check status, help)
- Quick action buttons for common tasks
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- IVIS LABS Chat API credentials

## Installation

1. **Clone or extract the project**
```bash
cd property-listing-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API credentials**

Copy `.env.example` to `.env` and add your IVIS LABS API key:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_API_BASE_URL=https://chat.ivislabs.in
REACT_APP_API_KEY=your-actual-api-key-here
```

4. **Start the development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
property-listing-chatbot/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatMessage.js      # Individual message component
│   │   └── PropertyForm.js      # Property details form modal
│   ├── services/
│   │   └── aiService.js         # IVIS LABS API integration
│   ├── App.js                   # Main application component
│   ├── App.css                  # WhatsApp-style styling
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
├── .env                         # API configuration (not in git)
├── .env.example                 # Environment template
├── package.json
└── README.md
```

## How It Works

### Conversation Flow

1. **User greets the bot** → Bot introduces itself and available features
2. **User says "I want to list my property"** → Bot opens property form
3. **User fills property details** → Form collects:
   - Property type
   - Price
   - Location
   - Description
   - Amenities
   - Owner name
   - Images (multiple)
   - Video (optional)
4. **User submits form** → Bot simulates owner approval workflow
5. **Bot confirms listing** → Shows summary and next steps

### AI Integration

The app uses IVIS LABS Chat API for:
- Natural language understanding
- Context-aware responses
- Handling general queries about property listings

### Key Components

**App.js**
- Main chat interface
- Message management
- Conversation flow logic
- Intent recognition

**ChatMessage.js**
- Individual message rendering
- Timestamp formatting
- Message status indicators

**PropertyForm.js**
- Property details collection
- File upload handling
- Form validation

**aiService.js**
- API communication
- Error handling
- Fallback responses

## Customization

### Change AI Model
Edit `src/services/aiService.js`:
```javascript
model: 'granite3.1-dense:latest'  // Change to your preferred model
```

### Modify System Prompt
Edit the system message in `aiService.js` to customize bot behavior:
```javascript
{
  role: 'system',
  content: 'Your custom instructions here...'
}
```

### Styling
All styles are in `src/App.css`. Colors follow WhatsApp's design:
- Background: `#0b141a`
- User messages: `#005c4b`
- Bot messages: `#202c33`
- Accent: `#00a884`

## API Configuration

### IVIS LABS Chat API
Endpoint: `https://chat.ivislabs.in/chat/completions`

Request format:
```javascript
{
  model: 'granite3.1-dense:latest',
  messages: [
    { role: 'system', content: 'System prompt' },
    { role: 'user', content: 'User message' }
  ],
  temperature: 0.7,
  max_tokens: 500
}
```

### Testing API Connection
The service automatically tests connection on startup in development mode.
Check browser console for connection status.

## Deployment

### Build for production
```bash
npm run build
```

This creates an optimized build in the `build/` folder.

### Deploy to hosting
Upload the `build/` folder to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

**Important:** Set environment variables in your hosting platform:
- `REACT_APP_API_BASE_URL`
- `REACT_APP_API_KEY`

## Features Demo

### Quick Actions
- 🏠 List Property
- 📋 Check Status
- ❓ Help

### Intent Recognition
The bot recognizes:
- Property listing requests: "list", "post", "property", "sell", "rent"
- Status inquiries: "status", "check"
- Greetings: "hi", "hello", "hey"
- Help requests: automatically provides guidance

### Smart Responses
- Uses AI for general queries
- Falls back to scripted responses if API fails
- Maintains conversation context

## Troubleshooting

### API Connection Issues
1. Check `.env` file has correct API key
2. Verify API_BASE_URL is correct
3. Check browser console for error messages
4. Test API with: `aiService.testConnection()`

### CORS Issues
If you see CORS errors, ensure:
- API supports CORS from your domain
- Headers include proper Authorization
- Mode is set to 'cors'

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Future Enhancements

Potential additions:
- [ ] Real WhatsApp Business API integration
- [ ] Database backend for property storage
- [ ] Owner approval dashboard
- [ ] Property search functionality
- [ ] User authentication
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Multi-language support

## Tech Stack

- **Frontend:** React 18
- **Styling:** Pure CSS (WhatsApp theme)
- **AI:** IVIS LABS Chat API (Granite 3.1 Dense)
- **State Management:** React Hooks (useState, useEffect)

## License

Proprietary - IVIS LABS Private Limited

## Contact

For support or questions:
- Website: https://ivislabs.in
- Location: Mysuru, India

---

Built with ❤️ by IVIS LABS
