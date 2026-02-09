// AI Service — proxied through our backend to avoid CORS issues

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const MODEL_NAME = process.env.REACT_APP_MODEL_NAME || 'granite3.1-dense:latest';

export const aiService = {
  async getChatResponse(query, context = {}) {
    try {
      const url = `${BACKEND_URL}/api/chat`;

      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt(context);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'x-api-key': API_KEY })
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', response.status, errorData);
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error getting chat response:', error);
      
      // Return a fallback response instead of throwing
      return this.getFallbackResponse(query, context);
    }
  },

  /**
   * Build system prompt with context about available properties
   */
  buildSystemPrompt(context = {}) {
    let prompt = `You are a helpful property listing assistant for IVIS Property Listings.

Your role:
- Help users find properties that match their requirements
- Ask clarifying questions about budget, location, property type
- Provide relevant property recommendations from available listings
- Be friendly, professional, and concise
- Use emojis sparingly for a friendly touch`;

    // Add property context if available
    if (context.properties && context.properties.length > 0) {
      prompt += `\n\nAvailable Properties (${context.properties.length} total):`;
      
      // Add summary of available properties
      const summary = this.summarizeProperties(context.properties);
      prompt += `\n${summary}`;
      
      prompt += `\n\nWhen user asks about properties, recommend from these listings based on their requirements.`;
    }

    // Add user preferences if available
    if (context.userPreferences) {
      prompt += `\n\nUser preferences: ${JSON.stringify(context.userPreferences)}`;
    }

    // Add conversation history context
    if (context.conversationContext) {
      prompt += `\n\nConversation context: ${context.conversationContext}`;
    }

    return prompt;
  },

  /**
   * Summarize properties for AI context
   */
  summarizeProperties(properties) {
    const types = {};
    const locations = {};
    let minPrice = Infinity;
    let maxPrice = 0;

    properties.forEach(prop => {
      // Count types
      types[prop.type] = (types[prop.type] || 0) + 1;
      
      // Count locations
      const loc = prop.location.split(',')[0].trim();
      locations[loc] = (locations[loc] || 0) + 1;
      
      // Track price range
      const price = parseFloat(prop.price.toString().replace(/[^0-9]/g, ''));
      if (price) {
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
      }
    });

    let summary = '\n';
    summary += `- Types: ${Object.entries(types).map(([k, v]) => `${k} (${v})`).join(', ')}\n`;
    summary += `- Locations: ${Object.entries(locations).map(([k, v]) => `${k} (${v})`).join(', ')}\n`;
    summary += `- Price range: ₹${this.formatPrice(minPrice)} - ₹${this.formatPrice(maxPrice)}`;

    return summary;
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
   * Get fallback response when API fails
   */
  getFallbackResponse(query, context) {
    const lowerQuery = query.toLowerCase();
    
    // Check if asking about properties
    if (lowerQuery.includes('property') || lowerQuery.includes('house') || 
        lowerQuery.includes('apartment') || lowerQuery.includes('villa')) {
      
      if (context.properties && context.properties.length > 0) {
        return `I can help you find properties! We have ${context.properties.length} listings available. What are you looking for? (e.g., location, budget, property type)`;
      }
      
      return "I can help you find properties! Please tell me:\n• What type of property? (Apartment/Villa/House)\n• Preferred location?\n• Your budget range?";
    }
    
    // Default fallback
    return `I'm here to help with property listings! You can:
• Search for properties
• List your property
• Ask questions about the process

What would you like to do?`;
  },

  /**
   * Extract user requirements from query using AI
   */
  async extractRequirements(query) {
    try {
      const extractionPrompt = `Extract property search requirements from this user query.
Return JSON with: type, location, minPrice, maxPrice, amenities (array).
Set null for any unspecified fields.

User query: "${query}"

Return only valid JSON, nothing else.`;

      const response = await this.getChatResponse(extractionPrompt);
      
      // Try to parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {};
    } catch (error) {
      console.error('Error extracting requirements:', error);
      return this.extractRequirementsSimple(query);
    }
  },

  /**
   * Simple rule-based requirement extraction (fallback)
   */
  extractRequirementsSimple(query) {
    const lowerQuery = query.toLowerCase();
    const requirements = {};

    // Extract type
    if (lowerQuery.includes('apartment')) requirements.type = 'Apartment';
    else if (lowerQuery.includes('villa')) requirements.type = 'Villa';
    else if (lowerQuery.includes('house')) requirements.type = 'House';
    else if (lowerQuery.includes('plot')) requirements.type = 'Plot';

    // Extract price mentions
    const priceMatch = lowerQuery.match(/(\d+)\s*(lakh|lakhs|crore|crores)/i);
    if (priceMatch) {
      let amount = parseInt(priceMatch[1]);
      if (priceMatch[2].startsWith('crore')) amount *= 10000000;
      else if (priceMatch[2].startsWith('lakh')) amount *= 100000;
      
      if (lowerQuery.includes('under') || lowerQuery.includes('below')) {
        requirements.maxPrice = amount;
      } else if (lowerQuery.includes('above') || lowerQuery.includes('over')) {
        requirements.minPrice = amount;
      } else {
        requirements.maxPrice = amount;
      }
    }

    // Extract location (look for "in [location]")
    const locationMatch = lowerQuery.match(/\bin\s+([a-z\s]+?)(?:\s+with|\s+under|\s+below|\s*$)/i);
    if (locationMatch) {
      requirements.location = locationMatch[1].trim();
    }

    // Extract amenities
    const amenitiesList = ['parking', 'pool', 'gym', 'garden', 'security'];
    const foundAmenities = amenitiesList.filter(a => lowerQuery.includes(a));
    if (foundAmenities.length > 0) {
      requirements.amenities = foundAmenities;
    }

    return requirements;
  },

};
