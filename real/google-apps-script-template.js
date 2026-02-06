/**
 * Google Apps Script for Property Listing Form
 * 
 * This script sends email notifications when someone submits a property listing.
 * 
 * SETUP INSTRUCTIONS:
 * 1. In your Google Sheet: Extensions → Apps Script
 * 2. Delete existing code and paste this entire script
 * 3. Update YOUR_EMAIL_HERE with your actual email
 * 4. Save the script (Ctrl+S)
 * 5. Set up trigger:
 *    - Click clock icon (Triggers)
 *    - Add Trigger
 *    - Function: onFormSubmit
 *    - Event: From spreadsheet → On form submit
 *    - Save
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

const OWNER_EMAIL = "your-email@ivislabs.in"; // Change this!
const COMPANY_NAME = "IVIS Property Listings";
const WEBSITE_URL = "https://ivislabs.in";

// ============================================
// MAIN FUNCTION - Runs on form submission
// ============================================

function onFormSubmit(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var row = sheet.getLastRow();
    
    // Get form data from the latest row
    var formData = getFormData(sheet, row);
    
    // Send notification to property owner/admin
    sendOwnerNotification(formData, sheet);
    
    // Send confirmation to customer
    sendCustomerConfirmation(formData);
    
    // Log success
    console.log("Emails sent successfully for submission by: " + formData.ownerName);
    
  } catch (error) {
    console.error("Error processing form submission: " + error);
    // Optionally send error notification to admin
    sendErrorNotification(error);
  }
}

// ============================================
// GET FORM DATA FROM SHEET
// ============================================

function getFormData(sheet, row) {
  // Adjust column numbers based on your form structure
  return {
    timestamp: sheet.getRange(row, 1).getValue(),
    email: sheet.getRange(row, 2).getValue(),
    propertyType: sheet.getRange(row, 3).getValue(),
    price: sheet.getRange(row, 4).getValue(),
    location: sheet.getRange(row, 5).getValue(),
    description: sheet.getRange(row, 6).getValue(),
    amenities: sheet.getRange(row, 7).getValue(),
    ownerName: sheet.getRange(row, 8).getValue(),
    contactNumber: sheet.getRange(row, 9).getValue(),
    // Images and video are file upload links (if enabled)
    images: sheet.getRange(row, 10).getValue(),
    video: sheet.getRange(row, 11).getValue()
  };
}

// ============================================
// SEND EMAIL TO OWNER/ADMIN
// ============================================

function sendOwnerNotification(data, sheet) {
  var subject = "🏠 New Property Listing Submitted";
  
  var body = "A new property listing has been submitted!\n\n" +
             "═══════════════════════════════════════\n" +
             "PROPERTY DETAILS\n" +
             "═══════════════════════════════════════\n\n" +
             "Property Type: " + data.propertyType + "\n" +
             "Price: ₹" + formatPrice(data.price) + "\n" +
             "Location: " + data.location + "\n\n" +
             "Description:\n" + data.description + "\n\n" +
             "Amenities: " + data.amenities + "\n\n" +
             "═══════════════════════════════════════\n" +
             "OWNER DETAILS\n" +
             "═══════════════════════════════════════\n\n" +
             "Name: " + data.ownerName + "\n" +
             "Email: " + data.email + "\n" +
             "Contact: " + data.contactNumber + "\n\n" +
             "═══════════════════════════════════════\n" +
             "SUBMISSION INFO\n" +
             "═══════════════════════════════════════\n\n" +
             "Submitted: " + formatTimestamp(data.timestamp) + "\n" +
             "Images: " + (data.images ? "Yes" : "No") + "\n" +
             "Video: " + (data.video ? "Yes" : "No") + "\n\n" +
             "View all listings: " + sheet.getUrl() + "\n\n" +
             "═══════════════════════════════════════\n\n" +
             "Next Steps:\n" +
             "1. Review the property details\n" +
             "2. Verify images and video\n" +
             "3. Contact owner for clarification if needed\n" +
             "4. Approve or request modifications\n\n" +
             "This is an automated notification from " + COMPANY_NAME;
  
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    body: body,
    name: COMPANY_NAME
  });
}

// ============================================
// SEND CONFIRMATION TO CUSTOMER
// ============================================

function sendCustomerConfirmation(data) {
  var subject = "Property Listing Received - " + COMPANY_NAME;
  
  var body = "Dear " + data.ownerName + ",\n\n" +
             "Thank you for submitting your property listing with " + COMPANY_NAME + "!\n\n" +
             "═══════════════════════════════════════\n" +
             "LISTING SUMMARY\n" +
             "═══════════════════════════════════════\n\n" +
             "Property Type: " + data.propertyType + "\n" +
             "Location: " + data.location + "\n" +
             "Price: ₹" + formatPrice(data.price) + "\n" +
             "Submitted: " + formatTimestamp(data.timestamp) + "\n\n" +
             "═══════════════════════════════════════\n" +
             "WHAT HAPPENS NEXT?\n" +
             "═══════════════════════════════════════\n\n" +
             "1. Our team will review your listing within 24-48 hours\n" +
             "2. We'll verify all details and media files\n" +
             "3. You'll receive an email once approved\n" +
             "4. Your property will be published on our platform\n\n" +
             "═══════════════════════════════════════\n" +
             "NEED HELP?\n" +
             "═══════════════════════════════════════\n\n" +
             "If you have any questions, please reply to this email\n" +
             "or contact us at: " + OWNER_EMAIL + "\n\n" +
             "Website: " + WEBSITE_URL + "\n\n" +
             "Best regards,\n" +
             COMPANY_NAME + " Team\n\n" +
             "---\n" +
             "This is an automated confirmation email. Please do not reply directly.";
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    name: COMPANY_NAME,
    replyTo: OWNER_EMAIL
  });
}

// ============================================
// SEND ERROR NOTIFICATION (OPTIONAL)
// ============================================

function sendErrorNotification(error) {
  try {
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: "⚠️ Error Processing Property Listing Form",
      body: "An error occurred while processing a form submission:\n\n" +
            "Error: " + error + "\n\n" +
            "Please check the form responses and script logs.",
      name: COMPANY_NAME
    });
  } catch (e) {
    console.error("Failed to send error notification: " + e);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatPrice(price) {
  // Format price with commas (Indian numbering system)
  if (!price) return "Not specified";
  
  price = price.toString();
  var lastThree = price.substring(price.length - 3);
  var otherNumbers = price.substring(0, price.length - 3);
  
  if (otherNumbers != '') {
    lastThree = ',' + lastThree;
  }
  
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "Unknown";
  
  var date = new Date(timestamp);
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd MMM yyyy, hh:mm a");
}

// ============================================
// TEST FUNCTIONS (Run manually to test)
// ============================================

function testEmailNotification() {
  // Test data
  var testData = {
    timestamp: new Date(),
    email: "test@example.com",
    propertyType: "Villa",
    price: "5000000",
    location: "Jayanagar, Bangalore",
    description: "Beautiful 3BHK villa with modern amenities",
    amenities: "Parking, Swimming Pool, Gym",
    ownerName: "Test User",
    contactNumber: "9876543210",
    images: "Yes",
    video: "No"
  };
  
  console.log("Sending test emails...");
  sendOwnerNotification(testData, SpreadsheetApp.getActiveSheet());
  sendCustomerConfirmation(testData);
  console.log("Test emails sent!");
}

// ============================================
// ADDITIONAL FEATURES (OPTIONAL)
// ============================================

/**
 * Add row coloring based on status
 * Run this after reviewing a listing
 */
function markAsApproved(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn())
       .setBackground("#d9ead3"); // Light green
}

function markAsRejected(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn())
       .setBackground("#f4cccc"); // Light red
}

function markAsPending(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn())
       .setBackground("#fff2cc"); // Light yellow
}

/**
 * Send follow-up email to pending listings
 * Can be set up as a daily trigger
 */
function sendFollowUps() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var submissionDate = new Date(data[i][0]);
    var daysSince = Math.floor((new Date() - submissionDate) / (1000 * 60 * 60 * 24));
    
    // Follow up after 3 days
    if (daysSince === 3) {
      var email = data[i][1];
      var ownerName = data[i][7];
      
      MailApp.sendEmail({
        to: email,
        subject: "Property Listing Update - " + COMPANY_NAME,
        body: "Dear " + ownerName + ",\n\n" +
              "We wanted to update you on your property listing submitted " + daysSince + " days ago.\n\n" +
              "Our team is currently reviewing your submission. We appreciate your patience.\n\n" +
              "You should hear from us within the next 24 hours.\n\n" +
              "Best regards,\n" + COMPANY_NAME + " Team"
      });
    }
  }
}

// ============================================
// END OF SCRIPT
// ============================================

/**
 * INSTALLATION CHECKLIST:
 * 
 * ☐ Updated OWNER_EMAIL variable
 * ☐ Updated COMPANY_NAME variable  
 * ☐ Updated WEBSITE_URL variable
 * ☐ Saved the script
 * ☐ Authorized the script (run testEmailNotification)
 * ☐ Set up onFormSubmit trigger
 * ☐ Tested with actual form submission
 * 
 * OPTIONAL ENHANCEMENTS:
 * ☐ Set up daily trigger for sendFollowUps
 * ☐ Add status column in sheet
 * ☐ Create approval/rejection buttons
 * ☐ Add Slack/WhatsApp notifications
 */
