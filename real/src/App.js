import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { aiService } from './services/aiService';
import { sheetsService, getCachedProperties } from './services/sheetsService';
import ChatMessage from './components/ChatMessage';
import PropertyForm from './components/PropertyForm';

// Configuration - Set to true and provide URL to use Google Form instead of custom form
const USE_GOOGLE_FORM = false;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [availableProperties, setAvailableProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load properties from Google Sheets
    const loadProperties = async () => {
      try {
        const properties = await getCachedProperties();
        setAvailableProperties(properties);
        setLoadingProperties(false);
        console.log(`Loaded ${properties.length} properties`);
      } catch (error) {
        console.error('Failed to load properties:', error);
        setLoadingProperties(false);
      }
    };

    loadProperties();

    // Initial greeting
    setTimeout(() => {
      const initialMessage = {
        id: Date.now(),
        text: "👋 Hello! Welcome to IVIS Property Listings.\n\nI'm your AI assistant. I can help you:\n• Find properties based on your requirements\n• List your property\n• Answer questions about the process\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        actions: [
          { label: '🔍 Search Properties', value: 'Show me available properties' },
          { label: '🏠 List Property', value: 'I want to list my property' },
          { label: '❓ Help', value: 'How does this work?' }
        ]
      };
      setMessages([initialMessage]);
    }, 500);
  }, []);

  const quickActions = [
    { label: '🔍 Search Properties', value: 'Show me available properties' },
    { label: '🏠 List Property', value: 'I want to list my property' },
    { label: '❓ Help', value: 'How does this work?' }
  ];

  const addMessage = (text, sender = 'user', actions = null) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      sender,
      timestamp: new Date(),
      ...(actions && { actions })
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const simulateTyping = (duration = 1000) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, duration);
    });
  };

  const handlePropertyListing = async () => {
    await simulateTyping(800);
    addMessage(
      "Great! I'll help you list your property. 📝\n\nPlease click the button below to fill in the property details.",
      'bot'
    );
    setShowPropertyForm(true);
  };

  const handlePropertySearch = async (userMessage) => {
    await simulateTyping(1000);
    
    // Extract requirements from user message
    const requirements = await aiService.extractRequirements(userMessage);
    console.log('Extracted requirements:', requirements);
    
    // Filter properties based on requirements
    const filtered = sheetsService.filterProperties(availableProperties, requirements);
    
    if (filtered.length === 0) {
      addMessage(
        "I couldn't find any properties matching those specific criteria. 😕\n\nWould you like to:\n• Adjust your requirements\n• See all available properties\n• List your own property",
        'bot'
      );
      return;
    }
    
    await simulateTyping(500);
    
    // Show summary first
    const summary = sheetsService.createPropertyListingSummary(filtered);
    addMessage(summary, 'bot');
    
    await simulateTyping(1000);
    
    // Show detailed listings (max 3)
    if (filtered.length <= 3) {
      filtered.forEach(async (prop, index) => {
        await simulateTyping(800);
        const formatted = sheetsService.formatPropertyForChat(prop);
        addMessage(formatted, 'bot');
      });
    } else {
      // Show top 3 and offer to see more
      for (let i = 0; i < 3; i++) {
        await simulateTyping(800);
        const formatted = sheetsService.formatPropertyForChat(filtered[i]);
        addMessage(formatted, 'bot');
      }
      
      await simulateTyping(500);
      addMessage(
        `I have ${filtered.length - 3} more properties that match your criteria. Would you like to see them or refine your search?`,
        'bot'
      );
    }
    
    await simulateTyping(800);
    addMessage(
      "Would you like more details about any of these properties? Just let me know! 😊",
      'bot'
    );
  };

  const handlePropertySubmission = async (formData) => {
    setShowPropertyForm(false);
    setPropertyData(formData);
    
    addMessage("✅ Property details received!", 'bot');
    
    await simulateTyping(1500);
    
    const summary = `
📋 *Property Details Summary*

🏠 *Type:* ${formData.type}
💰 *Price:* ₹${formData.price}
📍 *Location:* ${formData.location}
📝 *Description:* ${formData.description}
🛏️ *Amenities:* ${formData.amenities}
👤 *Owner:* ${formData.ownerName}
📸 *Images:* ${formData.images ? formData.images.length : 0} uploaded
🎥 *Video:* ${formData.video ? 'Yes' : 'No'}

Your property listing has been forwarded to the owner for approval. You'll receive a confirmation once it's reviewed. ⏳
    `.trim();
    
    addMessage(summary, 'bot');
    
    await simulateTyping(2000);
    addMessage(
      "Would you like to:\n• List another property\n• Check listing status\n• Speak to an agent",
      'bot'
    );
  };

  const processUserMessage = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for property listing intent
    if (lowerMessage.includes('list') && 
        (lowerMessage.includes('my') || lowerMessage.includes('property')) || 
        lowerMessage.includes('post') || 
        lowerMessage.includes('sell') && !lowerMessage.includes('show')) {
      await handlePropertyListing();
      return;
    }
    
    // Check for property search intent
    if (lowerMessage.includes('find') || 
        lowerMessage.includes('looking for') ||
        lowerMessage.includes('search') ||
        lowerMessage.includes('show') && (lowerMessage.includes('property') || lowerMessage.includes('properties')) ||
        lowerMessage.includes('apartment') ||
        lowerMessage.includes('villa') ||
        lowerMessage.includes('house') ||
        lowerMessage.includes('plot') ||
        (lowerMessage.includes('buy') || lowerMessage.includes('rent')) && 
        (lowerMessage.includes('property') || lowerMessage.includes('apartment') || lowerMessage.includes('house'))) {
      
      if (loadingProperties) {
        await simulateTyping(500);
        addMessage("Please wait while I load the available properties... ⏳", 'bot');
        return;
      }
      
      if (availableProperties.length === 0) {
        await simulateTyping(500);
        addMessage(
          "I don't have any property listings available at the moment. Would you like to list your property? 🏠",
          'bot'
        );
        return;
      }
      
      await handlePropertySearch(userMessage);
      return;
    }
    
    // Check for greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      await simulateTyping(500);
      const propertiesInfo = availableProperties.length > 0 
        ? `\n\n🏘️ We currently have *${availableProperties.length} properties* available for you to explore!`
        : '';
      
      addMessage(
        `Hello! 👋 How can I help you today?${propertiesInfo}\n\nYou can:\n• Search for properties (e.g., "Show me villas in Bangalore")\n• List your property\n• Ask about the process`,
        'bot',
        quickActions
      );
      return;
    }
    
    // Check for "show all" or "see all"
    if (lowerMessage.includes('show all') || 
        lowerMessage.includes('see all') ||
        lowerMessage.includes('all properties')) {
      
      if (availableProperties.length === 0) {
        await simulateTyping(500);
        addMessage("No properties are currently listed. Be the first to list your property! 🏠", 'bot');
        return;
      }
      
      await simulateTyping(1000);
      const summary = `We have *${availableProperties.length} properties* available:\n\n`;
      const types = {};
      availableProperties.forEach(p => {
        types[p.type] = (types[p.type] || 0) + 1;
      });
      const breakdown = Object.entries(types)
        .map(([type, count]) => `• ${type}: ${count}`)
        .join('\n');
      
      addMessage(summary + breakdown + '\n\nWhat type of property are you looking for?', 'bot');
      return;
    }
    
    // Check for status inquiry
    if (lowerMessage.includes('status') || lowerMessage.includes('check')) {
      await simulateTyping(800);
      if (propertyData) {
        addMessage(
          `Your property at *${propertyData.location}* is currently under review. We'll notify you once the owner approves it! 📋`,
          'bot'
        );
      } else {
        addMessage(
          "You haven't submitted any property listings yet. Would you like to list a property?",
          'bot'
        );
      }
      return;
    }
    
    // Use AI service for general queries with property context
    try {
      await simulateTyping(1200);
      const context = {
        properties: availableProperties,
        conversationContext: `User has seen ${messages.length} messages. ${availableProperties.length} properties available.`
      };
      
      const aiResponse = await aiService.getChatResponse(userMessage, context);
      addMessage(aiResponse, 'bot');
    } catch (error) {
      console.error('AI Service Error:', error);
      await simulateTyping(500);
      addMessage(
        "I'm here to help! You can:\n• Search for properties (e.g., 'Show me apartments in Bangalore')\n• List your property\n• Ask questions about the process\n\nWhat would you like to do?",
        'bot'
      );
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    const userMessage = inputText;
    setInputText('');
    
    // Add user message
    addMessage(userMessage, 'user');
    
    // Process message
    await processUserMessage(userMessage);
  };

  const handleQuickAction = async (action) => {
    addMessage(action, 'user');
    await processUserMessage(action);
  };

  return (
    <div className="whatsapp-container">
      {/* Header */}
      <div className="whatsapp-header">
        <div className="header-left">
          <div className="back-button">←</div>
          <div className="profile-pic">
            <div className="profile-icon">🏢</div>
          </div>
          <div className="header-info">
            <div className="contact-name">IVIS Property Listings</div>
            <div className="contact-status">
              {isTyping ? 'typing...' : 'Online'}
            </div>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">📹</button>
          <button className="icon-button">📞</button>
          <button className="icon-button">⋮</button>
        </div>
      </div>

      {/* Chat Background */}
      <div className="chat-background">
        {/* Messages Container */}
        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} onAction={handleQuickAction} />
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Property Form Modal */}
        {showPropertyForm && (
          <PropertyForm
            onSubmit={handlePropertySubmission}
            onClose={() => setShowPropertyForm(false)}
            useGoogleForm={USE_GOOGLE_FORM}
            googleFormUrl={GOOGLE_FORM_URL}
          />
        )}

      </div>

      {/* Input Area */}
      <div className="input-container">
        <button className="icon-button">😊</button>
        <button className="icon-button">📎</button>
        <form onSubmit={handleSendMessage} className="input-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message"
            className="message-input"
          />
        </form>
        {inputText.trim() ? (
          <button className="send-button" onClick={handleSendMessage}>
            ➤
          </button>
        ) : (
          <button className="icon-button">🎤</button>
        )}
      </div>
    </div>
  );
}

export default App;
