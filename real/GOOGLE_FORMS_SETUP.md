# Google Forms Integration Guide

## Overview

This chatbot now supports embedding real Google Forms for property listing, which gives you:
- ✅ Automatic data collection in Google Sheets
- ✅ Real-time form submissions
- ✅ Email notifications
- ✅ Easy data export and analysis
- ✅ No backend database needed initially

## Step-by-Step Setup

### Step 1: Create Your Google Form

1. **Go to Google Forms**
   - Visit: https://docs.google.com/forms
   - Click "+ Blank" to create a new form

2. **Name Your Form**
   - Title: "Property Listing Form"
   - Description: "Please fill in all details about your property"

3. **Add Form Fields**

   Create these questions (in order):

   **Question 1: Property Type**
   - Type: Multiple choice
   - Options:
     - Apartment
     - Villa
     - House
     - Plot
     - Commercial
     - Office Space
   - Required: ✓

   **Question 2: Price (₹)**
   - Type: Short answer
   - Description: "Enter price in rupees (e.g., 5000000)"
   - Required: ✓

   **Question 3: Location**
   - Type: Short answer
   - Description: "Full address or area (e.g., Jayanagar, Bangalore)"
   - Required: ✓

   **Question 4: Property Description**
   - Type: Paragraph
   - Description: "Describe your property in detail"
   - Required: ✓

   **Question 5: Amenities**
   - Type: Checkboxes
   - Options:
     - Parking
     - Swimming Pool
     - Gym
     - Garden
     - Security
     - Power Backup
     - Lift
     - Club House
   - Required: No

   **Question 6: Owner Name**
   - Type: Short answer
   - Required: ✓

   **Question 7: Contact Number**
   - Type: Short answer
   - Validation: Number
   - Required: ✓

   **Question 8: Email Address**
   - Type: Short answer
   - Validation: Email
   - Required: ✓

   **Question 9: Property Images**
   - Type: File upload
   - Allow: Images only
   - Max files: 10
   - Max size: 10 MB per file
   - Required: No

   **Question 10: Property Video**
   - Type: File upload
   - Allow: Video only
   - Max files: 1
   - Max size: 100 MB
   - Required: No

### Step 2: Configure Form Settings

1. **Click on Settings (gear icon)**

2. **General Tab**
   - ✓ Collect email addresses
   - ✓ Limit to 1 response
   - ✓ Allow response editing

3. **Presentation Tab**
   - ✓ Show progress bar
   - Confirmation message: "Thank you! Your property listing has been submitted successfully. Our team will review and contact you soon."

4. **Click "Save"**

### Step 3: Get the Embed URL

1. **Click "Send" button** (top right)

2. **Click the "< >" embed icon**

3. **Copy the iframe URL** - it looks like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...abc123.../viewform?embedded=true
   ```

4. **Copy just the URL** (not the full iframe code)

### Step 4: Link Responses to Google Sheets

1. **Click "Responses" tab** in your form

2. **Click the green Sheets icon** (Create Spreadsheet)

3. **Choose "Create a new spreadsheet"**

4. **Name it:** "Property Listings Database"

5. **Click "Create"**

Now all form submissions automatically save to this sheet!

### Step 5: Set Up Email Notifications

1. **In your Google Sheet**, go to: **Extensions** → **Apps Script**

2. **Delete any existing code** and paste this:

```javascript
function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getLastRow();
  
  // Get form data
  var timestamp = sheet.getRange(row, 1).getValue();
  var email = sheet.getRange(row, 2).getValue();
  var propertyType = sheet.getRange(row, 3).getValue();
  var price = sheet.getRange(row, 4).getValue();
  var location = sheet.getRange(row, 5).getValue();
  var ownerName = sheet.getRange(row, 6).getValue();
  
  // Email to owner
  var ownerSubject = "New Property Listing Submitted";
  var ownerBody = "A new property listing has been submitted:\n\n" +
                  "Owner: " + ownerName + "\n" +
                  "Type: " + propertyType + "\n" +
                  "Price: ₹" + price + "\n" +
                  "Location: " + location + "\n" +
                  "Email: " + email + "\n" +
                  "Submitted: " + timestamp + "\n\n" +
                  "View all listings: " + sheet.getUrl();
  
  MailApp.sendEmail({
    to: "your-email@ivislabs.in", // Change this to your email
    subject: ownerSubject,
    body: ownerBody
  });
  
  // Confirmation email to customer
  var customerSubject = "Property Listing Received - IVIS Property Listings";
  var customerBody = "Dear " + ownerName + ",\n\n" +
                     "Thank you for submitting your property listing!\n\n" +
                     "We have received the following details:\n" +
                     "Property Type: " + propertyType + "\n" +
                     "Location: " + location + "\n" +
                     "Price: ₹" + price + "\n\n" +
                     "Our team will review your listing and contact you within 24-48 hours.\n\n" +
                     "Best regards,\n" +
                     "IVIS Property Listings Team";
  
  MailApp.sendEmail({
    to: email,
    subject: customerSubject,
    body: customerBody
  });
}
```

3. **Replace** `"your-email@ivislabs.in"` with your actual email

4. **Save** (Ctrl+S or File → Save)

5. **Click "Run"** → Select `onFormSubmit`

6. **Authorize** the script (first time only)

7. **Set up trigger:**
   - Click **clock icon** (Triggers) on left
   - Click **"+ Add Trigger"**
   - Choose function: `onFormSubmit`
   - Event source: "From spreadsheet"
   - Event type: "On form submit"
   - Click **"Save"**

### Step 6: Update Your Chatbot

1. **Open** `src/App.js`

2. **Find these lines** (near the top):
```javascript
const USE_GOOGLE_FORM = true;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true';
```

3. **Update** `GOOGLE_FORM_URL` with your actual form URL from Step 3

4. **Make sure** `USE_GOOGLE_FORM = true`

5. **Save the file**

### Step 7: Test the Integration

1. **Start your chatbot:**
   ```bash
   npm start
   ```

2. **Test the flow:**
   - Type: "I want to list my property"
   - Google Form should open in modal
   - Fill in all fields
   - Submit the form
   - Check your email for notifications
   - Check Google Sheet for new entry

## Google Form URL Examples

### Your form URL should look like:
```
https://docs.google.com/forms/d/e/1FAIpQLSc_abc123xyz/viewform?embedded=true
```

### Common mistakes to avoid:
❌ `https://docs.google.com/forms/d/1FAIpQLSc_abc123xyz/edit` (edit URL)
❌ `https://docs.google.com/forms/d/e/1FAIpQLSc_abc123xyz/viewform` (missing ?embedded=true)
✅ `https://docs.google.com/forms/d/e/1FAIpQLSc_abc123xyz/viewform?embedded=true` (correct!)

## Switching Between Custom Form and Google Form

### To use Google Form (recommended for production):
```javascript
const USE_GOOGLE_FORM = true;
const GOOGLE_FORM_URL = 'your-actual-form-url';
```

### To use custom form (for testing without Google account):
```javascript
const USE_GOOGLE_FORM = false;
const GOOGLE_FORM_URL = ''; // Not needed
```

## Data Structure in Google Sheets

Your sheet will have these columns:

| Timestamp | Email | Property Type | Price | Location | Description | Amenities | Owner Name | Contact | Images | Video |
|-----------|-------|---------------|-------|----------|-------------|-----------|------------|---------|--------|-------|
| 12/18/2024 10:30 | john@example.com | Villa | 5000000 | Bangalore | Beautiful... | Parking, Pool | John Doe | 9876543210 | [Files] | [File] |

## Advanced: Google Form Customization

### Theme & Style
1. Click the **palette icon** (Customize theme)
2. Choose colors matching WhatsApp theme:
   - Header: `#005c4b` (WhatsApp green)
   - Background: `#f0f2f5`
   - Text: `#111b21`

### File Upload Permissions
1. Go to **Settings** → **General**
2. Under "Respondent can upload files"
3. Ensure your Google Drive has enough space
4. Files are saved to: "Drive → Form Responses → [Your Form Name]"

### Response Validation
Add validation rules to fields:
- Price: Number, minimum 1000
- Contact: Number, exactly 10 digits
- Email: Email format

## Troubleshooting

### Form not loading in iframe
**Problem:** "This content cannot be displayed in a frame"
**Solution:** Make sure the URL has `?embedded=true` at the end

### File uploads not working
**Problem:** Users can't upload files
**Solution:** 
1. Check Google Form settings allow file upload
2. Verify respondents can access file upload (not restricted)
3. Check your Google Drive storage space

### Emails not sending
**Problem:** Script not sending emails
**Solution:**
1. Check script has authorization
2. Verify trigger is set up correctly
3. Check spam folder
4. Verify email addresses are correct

### Form submissions not appearing in chat
**Problem:** Bot doesn't detect submission
**Solution:**
1. Currently, automatic detection is limited
2. You can manually close the form after submission
3. Or use Google Apps Script webhook (advanced)

## Production Recommendations

### 1. Set up Google Workspace (if not already)
- Better file storage
- Custom domain emails
- Enhanced security

### 2. Use Google Drive API (Advanced)
- Get real-time submission notifications
- Automatically fetch latest submissions
- Display in admin dashboard

### 3. Add Response Validation
- Use Google Forms validation
- Add Apps Script validation
- Prevent spam submissions

### 4. Backup Your Data
- **File** → **Download** → **Microsoft Excel (.xlsx)**
- Set up automatic daily backups with Apps Script
- Use Google Drive sync to local machine

## Benefits of Google Forms Integration

✅ **Zero Backend Cost** - No server needed initially
✅ **Instant Setup** - 15 minutes to configure
✅ **Automatic Storage** - Google Sheets database
✅ **Email Notifications** - Automatic alerts
✅ **File Handling** - Images & videos stored in Drive
✅ **Data Analysis** - Built-in charts and analytics
✅ **Easy Export** - Download as Excel/CSV anytime
✅ **Collaboration** - Multiple people can access
✅ **Mobile Friendly** - Works perfectly on phones
✅ **Spam Protection** - Google's built-in security

## Sample Google Form Template

You can make a copy of this template (coming soon) or create your own following the steps above.

**Recommended Form Structure:**
1. Welcome section with instructions
2. Property details (6 questions)
3. Contact information (3 questions)
4. Media uploads (2 questions)
5. Thank you message

## Next Steps After Setup

1. ✅ Test form submission completely
2. ✅ Verify email notifications work
3. ✅ Check data appears in Google Sheet
4. ✅ Test file uploads
5. ✅ Share with test users
6. ✅ Monitor first 10 submissions
7. ✅ Adjust form based on feedback

---

**Need Help?**
- Google Forms Help: https://support.google.com/docs/topic/9054603
- Apps Script Documentation: https://developers.google.com/apps-script

**Ready to go live?** Once everything works in testing, you're ready for production!
