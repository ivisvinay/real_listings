# Quick Setup Guide

## Step 1: Install Dependencies
```bash
cd property-listing-chatbot
npm install
```

## Step 2: Configure API Key
1. Open `.env` file
2. Replace `your-api-key-here` with your actual IVIS LABS API key:
```
REACT_APP_API_KEY=sk_your_actual_key_here
```

## Step 3: Start Development Server
```bash
npm start
```

Application will open at: http://localhost:3000

## Testing the Chatbot

Try these interactions:

1. **Start conversation:**
   - Type: "Hello"
   - Bot will greet and show options

2. **List a property:**
   - Type: "I want to list my property"
   - Fill in the form that appears
   - Submit to see the workflow

3. **Ask questions:**
   - Type: "How does this work?"
   - Type: "What information do you need?"

4. **Check status:**
   - Type: "Check my listing status"

## Quick Action Buttons

Use the buttons at the bottom for:
- 🏠 List Property
- 📋 Check Status  
- ❓ Help

## Customization Tips

### Change Bot Name
In `App.js`, update:
```javascript
<div className="contact-name">Your Company Name</div>
```

### Modify Greeting Message
In `App.js`, find `useEffect` with `initialMessage`

### Change Colors
Edit `App.css`:
- User message: `.user-message { background: #005c4b; }`
- Bot message: `.bot-message { background: #202c33; }`
- Send button: `.send-button { background: #00a884; }`

## Common Issues

**Port already in use:**
```bash
# Try a different port
PORT=3001 npm start
```

**API not responding:**
- Check API key in `.env`
- Verify internet connection
- Check browser console for errors

**Dependencies error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Build

```bash
npm run build
```

Deploy the `build/` folder to your hosting service.

Remember to set environment variables in production!
