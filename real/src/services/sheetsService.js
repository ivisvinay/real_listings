// Google Sheets Integration Service
// This service fetches property listings from Google Sheets

const SHEETS_API_KEY = process.env.REACT_APP_SHEETS_API_KEY || '';
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID || '';
const SHEET_NAME = process.env.REACT_APP_SHEET_NAME || 'Form Responses 1';

export const sheetsService = {
  /**
   * Fetch all property listings from Google Sheets
   * @returns {Promise<Array>} Array of property objects
   */
  async fetchProperties() {
    try {
      if (!SHEETS_API_KEY || !SPREADSHEET_ID) {
        console.warn('Google Sheets API not configured');
        return [];
      }

      const range = `${SHEET_NAME}!A:L`; // Adjust columns as needed
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Sheets API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.values || data.values.length < 2) {
        return [];
      }
      
      // Parse rows into property objects
      const headers = data.values[0];
      const rows = data.values.slice(1); // Skip header row
      
      const properties = rows.map((row, index) => {
        return this.parsePropertyRow(row, headers, index + 2); // +2 because of 0-index and header
      }).filter(p => p !== null);
      
      console.log(`Fetched ${properties.length} properties from Google Sheets`);
      return properties;
      
    } catch (error) {
      console.error('Error fetching properties from Sheets:', error);
      return [];
    }
  },

  /**
   * Parse a single row into a property object
   */
  parsePropertyRow(row, headers, rowNumber) {
    try {
      // Map common Google Form field names to property object
      // Adjust indices based on your actual form structure
      return {
        id: `prop_${rowNumber}`,
        timestamp: row[0] || '',
        email: row[1] || '',
        type: row[2] || '',
        price: row[3] || '',
        location: row[4] || '',
        description: row[5] || '',
        amenities: row[6] || '',
        ownerName: row[7] || '',
        contactNumber: row[8] || '',
        images: row[9] || '',
        video: row[10] || '',
        status: row[11] || 'pending', // If you have a status column
      };
    } catch (error) {
      console.error('Error parsing row:', error);
      return null;
    }
  },

  /**
   * Filter properties based on criteria
   */
  filterProperties(properties, criteria) {
    let filtered = [...properties];
    
    if (criteria.type) {
      filtered = filtered.filter(p => 
        p.type.toLowerCase().includes(criteria.type.toLowerCase())
      );
    }
    
    if (criteria.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    
    if (criteria.minPrice) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.price.toString().replace(/[^0-9]/g, ''));
        return price >= criteria.minPrice;
      });
    }
    
    if (criteria.maxPrice) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.price.toString().replace(/[^0-9]/g, ''));
        return price <= criteria.maxPrice;
      });
    }
    
    if (criteria.amenities && criteria.amenities.length > 0) {
      filtered = filtered.filter(p => {
        const propertyAmenities = p.amenities.toLowerCase();
        return criteria.amenities.some(amenity => 
          propertyAmenities.includes(amenity.toLowerCase())
        );
      });
    }
    
    return filtered;
  },

  /**
   * Format property for display in chat
   */
  formatPropertyForChat(property) {
    return `
🏠 *${property.type}*
📍 Location: ${property.location}
💰 Price: ₹${this.formatPrice(property.price)}
📝 ${property.description.substring(0, 100)}${property.description.length > 100 ? '...' : ''}
✨ Amenities: ${property.amenities || 'Not specified'}
👤 Contact: ${property.ownerName}
📞 ${property.contactNumber}
    `.trim();
  },

  /**
   * Format price with Indian numbering
   */
  formatPrice(price) {
    const priceStr = price.toString().replace(/[^0-9]/g, '');
    if (!priceStr) return price;
    
    let lastThree = priceStr.substring(priceStr.length - 3);
    let otherNumbers = priceStr.substring(0, priceStr.length - 3);
    
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  },

  /**
   * Create property listing summary
   */
  createPropertyListingSummary(properties) {
    if (properties.length === 0) {
      return "No properties found matching your criteria.";
    }

    let summary = `Found ${properties.length} propert${properties.length === 1 ? 'y' : 'ies'}:\n\n`;
    
    properties.slice(0, 5).forEach((prop, index) => { // Show max 5
      summary += `${index + 1}. ${prop.type} in ${prop.location} - ₹${this.formatPrice(prop.price)}\n`;
    });
    
    if (properties.length > 5) {
      summary += `\n...and ${properties.length - 5} more properties.`;
    }
    
    return summary;
  }
};

// Cache for properties (refresh every 5 minutes)
let propertiesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedProperties = async () => {
  const now = Date.now();
  
  if (propertiesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return propertiesCache;
  }
  
  propertiesCache = await sheetsService.fetchProperties();
  cacheTimestamp = now;
  
  return propertiesCache;
};
