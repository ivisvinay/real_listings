# Google Sheets Integration for Property Search

## 🎯 Overview

Your chatbot now has **intelligent property search** capabilities! It can:

✅ **Read existing property listings** from your Google Form responses  
✅ **Use AI to understand** user requirements  
✅ **Filter and recommend** properties based on what users want  
✅ **Have intelligent conversations** about available properties  

---

## 🚀 Quick Setup (10 Minutes)

### Step 1: Enable Google Sheets API (5 min)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select Project**
   - Click project dropdown → "New Project"
   - Name: "Property Listing Bot"
   - Click "Create"

3. **Enable Google Sheets API**
   - Navigate to: "APIs & Services" → "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"

4. **Create API Credentials**
   - Go to: "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - **Copy the API key** (you'll need this!)
   - Click "Restrict Key" (recommended)
   - Under "API restrictions" → Select "Google Sheets API"
   - Save

### Step 2: Get Your Spreadsheet ID (1 min)

1. **Open your Google Form responses**
   - Go to your form → "Responses" tab
   - Click the Sheets icon (should already be linked)

2. **Copy Spreadsheet ID**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part
   
   Example:
   ```
   URL: https://docs.google.com/spreadsheets/d/1abc123XYZ-def456/edit
   Spreadsheet ID: 1abc123XYZ-def456
   ```

### Step 3: Make Sheet Public (1 min)

1. **In your Google Sheet**: Click "Share" button
2. **Change access**: "Anyone with the link" → "Viewer"
3. **Click "Done"**

This allows the API to read your data (read-only access).

### Step 4: Configure Your Chatbot (2 min)

1. **Open** `.env` file

2. **Add your credentials**:
   ```env
   # Google Sheets Configuration
   REACT_APP_SHEETS_API_KEY=AIzaSyC...your-actual-key
   REACT_APP_SPREADSHEET_ID=1abc123XYZ-def456
   REACT_APP_SHEET_NAME=Form Responses 1
   ```

3. **Save the file**

### Step 5: Configure Open WebUI (Optional)

If using Open WebUI instead of IVIS LABS API:

```env
# API Configuration
REACT_APP_API_BASE_URL=https://your-openwebui-url.com
REACT_APP_API_KEY=your-openwebui-api-key
REACT_APP_MODEL_NAME=llama2:latest
REACT_APP_USE_OPEN_WEBUI=true
```

### Step 6: Test! (1 min)

```bash
npm start
```

Try these queries:
- "Show me available properties"
- "Find me a villa in Bangalore"
- "I'm looking for an apartment under 50 lakhs"
- "Show me properties with parking"

---

## 🎨 How It Works

### User Experience Flow

```
User: "Show me villas in Bangalore under 1 crore"
  ↓
Bot: [AI extracts requirements]
  - Type: Villa
  - Location: Bangalore  
  - Max Price: 1,00,00,000
  ↓
Bot: [Searches Google Sheets]
  - Found 3 matching properties
  ↓
Bot: Shows each property with:
  - Type, Location, Price
  - Description
  - Amenities
  - Owner contact
```

### Technical Flow

```
1. Properties loaded from Google Sheets on app start
2. Cached for 5 minutes (auto-refresh)
3. User sends query
4. AI extracts requirements (type, location, price, amenities)
5. Sheets service filters properties
6. Bot displays results conversationally
7. AI provides context-aware responses
```

---

## 📊 Data Structure Expected

Your Google Sheets should have these columns (adjust in code if different):

| Column | Description | Example |
|--------|-------------|---------|
| A - Timestamp | Submission time | 12/18/2024 10:30 AM |
| B - Email | Contact email | john@example.com |
| C - Property Type | Type | Villa |
| D - Price | Price in rupees | 5000000 |
| E - Location | Full address/area | Jayanagar, Bangalore |
| F - Description | Property details | Beautiful 3BHK... |
| G - Amenities | Comma-separated | Parking, Pool, Gym |
| H - Owner Name | Name | John Doe |
| I - Contact Number | Phone | 9876543210 |
| J - Images | File links | [Google Drive links] |
| K - Video | File link | [Google Drive link] |
| L - Status | Approval status | pending/approved |

**Note:** If your columns are different, edit `sheetsService.js` line ~50 (parsePropertyRow function).

---

## 🤖 AI-Powered Search Features

### Natural Language Understanding

The bot understands queries like:
- ✅ "Show me apartments"
- ✅ "I'm looking for a villa in Bangalore"
- ✅ "Properties under 50 lakhs"
- ✅ "House with parking and gym"
- ✅ "Find me something in Jayanagar"

### Intelligent Filtering

Filters properties by:
- **Type**: Apartment, Villa, House, Plot, Commercial
- **Location**: City, area, or neighborhood
- **Price Range**: Min/max budget
- **Amenities**: Parking, pool, gym, garden, etc.

### Context-Aware Responses

AI maintains context:
- Remembers user preferences in conversation
- Suggests related properties
- Asks clarifying questions
- Provides helpful comparisons

---

## 🔧 Customization

### Adjust Cache Duration

In `sheetsService.js`:
```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
// Change to: 10 * 60 * 1000 for 10 minutes
```

### Change Column Mapping

In `sheetsService.js`, update `parsePropertyRow()`:
```javascript
parsePropertyRow(row, headers, rowNumber) {
  return {
    id: `prop_${rowNumber}`,
    // Adjust these indices based on your columns:
    timestamp: row[0],
    email: row[1],
    type: row[2],  // Change index if needed
    price: row[3],
    // ... etc
  };
}
```

### Add Custom Filters

In `sheetsService.js`, add to `filterProperties()`:
```javascript
// Example: Filter by number of bedrooms
if (criteria.bedrooms) {
  filtered = filtered.filter(p => 
    p.description.includes(`${criteria.bedrooms}BHK`)
  );
}
```

---

## 🎯 Example Conversations

### Example 1: Simple Search
```
User: Show me properties
Bot: We have 15 properties available:
     - Apartment (5)
     - Villa (7)  
     - House (3)
     What type interests you?

User: Villas
Bot: Found 7 villas:
     1. Villa in Mysore - ₹85,00,000
     2. Villa in Bangalore - ₹1,20,00,000
     [Shows detailed info for each]
```

### Example 2: Specific Requirements
```
User: I want a 3BHK apartment in Bangalore under 60 lakhs
Bot: [AI extracts: type=Apartment, location=Bangalore, maxPrice=6000000]
     Found 2 properties matching your criteria!
     
     🏠 Apartment
     📍 Jayanagar, Bangalore
     💰 ₹55,00,000
     📝 Spacious 3BHK with modern amenities...
     [Shows full details]
```

### Example 3: Refinement
```
User: Show me properties with swimming pool
Bot: Found 4 properties with swimming pool:
     [Lists properties]
     
User: Which one is cheapest?
Bot: The most affordable is the apartment in 
     Whitefield at ₹65,00,000 with pool, gym, 
     and parking. Would you like more details?
```

---

## 📈 Performance Tips

### Optimize Data Loading
- Properties load once on app start
- Cached for 5 minutes
- Automatic refresh when cache expires
- No database queries needed

### Reduce API Calls
- AI requirement extraction happens once per query
- Filtering done locally (very fast)
- No API calls for displaying results

### Handle Large Datasets
If you have 100+ properties:
```javascript
// Show first 5, paginate rest
properties.slice(0, 5).forEach(/* display */);
```

---

## 🆘 Troubleshooting

### Properties Not Loading

**Check 1:** Console errors
```javascript
// Browser Console → Look for:
"Sheets API error" or "Failed to load properties"
```

**Check 2:** API Key valid
- Test: https://sheets.googleapis.com/v4/spreadsheets/YOUR_ID/values/Sheet1!A1?key=YOUR_KEY

**Check 3:** Sheet is public
- Share settings: "Anyone with link can view"

**Check 4:** Correct Spreadsheet ID
- Verify ID in .env matches URL

### AI Not Understanding Queries

**Solution 1:** Check model name in .env
```env
REACT_APP_MODEL_NAME=granite3.1-dense:latest
```

**Solution 2:** Verify Open WebUI endpoint
```env
REACT_APP_API_BASE_URL=https://your-correct-url.com
```

**Solution 3:** Check API key works
- Test with: curl request to your API

### No Results Found

**Check 1:** Data format in Sheets
- Verify column order matches code
- Check property type names (exact match)

**Check 2:** Filter criteria too strict
- Try broader search first
- Check spelling of locations

**Check 3:** Status filter
- Ensure properties have status="approved" if filtering

### CORS Errors

**For Google Sheets API:**
- This shouldn't happen (Google allows CORS)
- If it does, verify API key restrictions

**For Open WebUI:**
- Ensure CORS enabled on your server
- Check Open WebUI settings

---

## 🌟 Advanced Features

### 1. Status-Based Filtering

Only show approved properties:
```javascript
// In sheetsService.js
filtered = filtered.filter(p => p.status === 'approved');
```

### 2. Price Sorting

Show cheapest first:
```javascript
filtered.sort((a, b) => {
  const priceA = parseFloat(a.price.replace(/[^0-9]/g, ''));
  const priceB = parseFloat(b.price.replace(/[^0-9]/g, ''));
  return priceA - priceB;
});
```

### 3. Featured Properties

Highlight specific properties:
```javascript
const featured = filtered.filter(p => p.featured === 'yes');
```

### 4. Save User Preferences

Store in localStorage:
```javascript
localStorage.setItem('userPreferences', JSON.stringify({
  type: 'Villa',
  location: 'Bangalore',
  maxPrice: 10000000
}));
```

---

## 📊 Analytics Ideas

Track user searches:
```javascript
// Log to Google Analytics or your backend
gtag('event', 'property_search', {
  type: requirements.type,
  location: requirements.location,
  priceRange: requirements.maxPrice
});
```

---

## 🚀 Production Checklist

Before going live:

- [ ] API keys configured
- [ ] Spreadsheet ID correct
- [ ] Sheet is public (viewer access)
- [ ] Test with real data
- [ ] AI responses appropriate
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Cache duration suitable
- [ ] CORS configured
- [ ] Analytics setup (optional)

---

## 🎉 You're Ready!

Your chatbot now has intelligent property search powered by:
- ✅ Real data from Google Sheets
- ✅ AI-powered natural language understanding
- ✅ Smart filtering and recommendations
- ✅ Context-aware conversations

**Test it now with:** "Show me properties in Bangalore"

---

**Questions?** Check the main documentation files or console logs for debugging.
