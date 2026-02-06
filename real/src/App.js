import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { aiService } from './services/aiService';
import { propertyService } from './services/propertyService';
import ChatMessage from './components/ChatMessage';
import PropertyForm from './components/PropertyForm';

// Configuration - Set your Google Form URL here
const USE_GOOGLE_FORM = false;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true';
import PropertyCard from './components/PropertyCard';

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
    // Load properties from backend
    const loadProperties = async () => {
      try {
        const properties = await propertyService.fetchProperties();
        setAvailableProperties(properties);
        setLoadingProperties(false);
        console.log(`Loaded ${properties.length} properties from backend`);
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

  const addMessage = (text, sender = 'user', actions = null, properties = null) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      sender,
      timestamp: new Date(),
      ...(actions && { actions }),
      ...(properties && { properties })
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
      "Great! I'll help you list your property. 📝\n\nPlease fill in the property details:",
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
    const filtered = propertyService.filterProperties(availableProperties, requirements);

    if (filtered.length === 0) {
      addMessage(
        "I couldn't find any properties matching those specific criteria. 😕",
        'bot',
        [
          { label: '🔍 See All Properties', value: 'Show me all properties' },
          { label: '🏠 List Property', value: 'I want to list my property' },
          { label: '❓ Help', value: 'How does this work?' }
        ]
      );
      return;
    }

    await simulateTyping(500);

    // Show results with property cards
    addMessage(
      `Found *${filtered.length} ${filtered.length === 1 ? 'property' : 'properties'}* matching your search:`,
      'bot',
      null,
      filtered
    );
  };

  const handlePropertySubmission = async (formData) => {
    setShowPropertyForm(false);

    addMessage("Uploading your property...", 'bot');

    try {
      // Submit to backend
      const savedProperty = await propertyService.createProperty(formData);
      setPropertyData(savedProperty);
      setAvailableProperties(prev => [...prev, savedProperty]);

      await simulateTyping(500);

      const imageCount = savedProperty.images ? savedProperty.images.length : 0;
      const summary = `✅ *Property listed successfully!*

🏠 *Type:* ${savedProperty.type}
💰 *Price:* ₹${propertyService.formatPrice(savedProperty.price)}
📍 *Location:* ${savedProperty.location}
📝 *Description:* ${savedProperty.description}
👤 *Owner:* ${savedProperty.ownerName}
📸 *Images:* ${imageCount} uploaded

Your property is now live and visible to searchers!`;

      addMessage(summary, 'bot');

      // Show the property card
      if (savedProperty.images && savedProperty.images.length > 0) {
        await simulateTyping(500);
        addMessage("Here's how your listing looks:", 'bot', null, [savedProperty]);
      }

      await simulateTyping(1000);
      addMessage(
        "What would you like to do next?",
        'bot',
        [
          { label: '🏠 List Another Property', value: 'I want to list my property' },
          { label: '🔍 Search Properties', value: 'Show me available properties' }
        ]
      );
    } catch (error) {
      console.error('Submission error:', error);
      addMessage(
        "Sorry, there was an error submitting your property. Please try again.",
        'bot',
        [{ label: '🏠 Try Again', value: 'I want to list my property' }]
      );
    }
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
          'bot',
          [
            { label: '🏠 List Property', value: 'I want to list my property' },
            { label: '❓ Help', value: 'How does this work?' }
          ]
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
        addMessage(
          "No properties are currently listed. Be the first to list your property! 🏠",
          'bot',
          [{ label: '🏠 List Property', value: 'I want to list my property' }]
        );
        return;
      }

      await simulateTyping(1000);
      addMessage(
        `Here are all *${availableProperties.length} properties* available:`,
        'bot',
        null,
        availableProperties
      );
      return;
    }

    // Check for status inquiry
    if (lowerMessage.includes('status') || lowerMessage.includes('check')) {
      await simulateTyping(800);
      if (propertyData) {
        addMessage(
          `Your property at *${propertyData.location}* is live and visible to searchers! 📋`,
          'bot'
        );
      } else {
        addMessage(
          "You haven't submitted any property listings yet. Would you like to list a property?",
          'bot',
          [
            { label: '🏠 List Property', value: 'I want to list my property' },
            { label: '🔍 Search Properties', value: 'Show me available properties' }
          ]
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
        "I'm here to help! What would you like to do?",
        'bot',
        quickActions
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
            <React.Fragment key={message.id}>
              <ChatMessage message={message} onAction={handleQuickAction} />
              {message.properties && message.properties.length > 0 && (
                <div className="property-cards-container">
                  {message.properties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              )}
            </React.Fragment>
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
