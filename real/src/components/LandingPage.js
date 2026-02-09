import React from 'react';

const LandingPage = ({ onStartChat, propertyCount }) => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <span className="logo-icon">🏢</span>
            <span className="logo-text">IVIS Property Listings</span>
          </div>
          <button className="nav-cta" onClick={onStartChat}>
            Open Chat
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">AI-Powered Property Platform</div>
          <h1 className="hero-title">
            Find Your Dream Property<br />
            <span className="hero-highlight">With AI Agents</span>
          </h1>
          <p className="hero-subtitle">
            Our intelligent agents work together to help you search, list, and
            discover properties — all through a simple chat interface.
          </p>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={onStartChat}>
              Start Chatting
              <span className="btn-arrow">→</span>
            </button>
            <a href="#how-it-works" className="hero-btn-secondary">
              See How It Works
            </a>
          </div>
          {propertyCount > 0 && (
            <div className="hero-stat">
              <span className="stat-number">{propertyCount}</span>
              <span className="stat-label">Properties Listed</span>
            </div>
          )}
        </div>
        <div className="hero-visual">
          <div className="chat-preview">
            <div className="preview-header">
              <span className="preview-dot green"></span>
              <span className="preview-title">IVIS Property Listings</span>
            </div>
            <div className="preview-messages">
              <div className="preview-msg bot">
                👋 Hello! I can help you find properties.
              </div>
              <div className="preview-msg user">
                Show me villas in Bangalore
              </div>
              <div className="preview-msg bot">
                Found 3 villas matching your search!
              </div>
              <div className="preview-card">
                <div className="preview-card-img">🏡</div>
                <div className="preview-card-info">
                  <strong>Villa in Jayanagar</strong>
                  <span>₹1.2 Cr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="landing-flow" id="how-it-works">
        <div className="flow-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">AI Agent Process Flow</h2>
          <p className="section-subtitle">
            Multiple specialized AI agents collaborate behind the scenes to deliver a seamless property experience.
          </p>

          <div className="flow-diagram">
            {/* User Node */}
            <div className="flow-node user-node">
              <div className="node-icon">👤</div>
              <div className="node-label">You</div>
              <div className="node-desc">Chat naturally</div>
            </div>

            <div className="flow-connector">
              <div className="connector-line"></div>
              <div className="connector-pulse"></div>
            </div>

            {/* Orchestrator Agent */}
            <div className="flow-node orchestrator-node">
              <div className="node-icon">🧠</div>
              <div className="node-label">Orchestrator Agent</div>
              <div className="node-desc">Understands your intent</div>
              <div className="node-tag">NLP</div>
            </div>

            <div className="flow-connector">
              <div className="connector-line"></div>
              <div className="connector-pulse"></div>
            </div>

            {/* Agent Grid */}
            <div className="flow-agents-grid">
              <div className="flow-node agent-node search-agent">
                <div className="node-icon">🔍</div>
                <div className="node-label">Search Agent</div>
                <div className="node-desc">Finds matching properties by type, location, price</div>
                <div className="node-tag">Filter & Match</div>
              </div>

              <div className="flow-node agent-node listing-agent">
                <div className="node-icon">📝</div>
                <div className="node-label">Listing Agent</div>
                <div className="node-desc">Collects property details & uploads photos</div>
                <div className="node-tag">Data & Media</div>
              </div>

              <div className="flow-node agent-node recommend-agent">
                <div className="node-icon">💡</div>
                <div className="node-label">Recommendation Agent</div>
                <div className="node-desc">AI-powered suggestions based on your preferences</div>
                <div className="node-tag">ML Model</div>
              </div>
            </div>

            <div className="flow-connector">
              <div className="connector-line"></div>
              <div className="connector-pulse"></div>
            </div>

            {/* Data Layer */}
            <div className="flow-data-layer">
              <div className="flow-node data-node">
                <div className="node-icon">🗄️</div>
                <div className="node-label">Property Database</div>
                <div className="node-desc">Listings, images, metadata</div>
              </div>
              <div className="flow-node data-node">
                <div className="node-icon">🤖</div>
                <div className="node-label">AI Engine</div>
                <div className="node-desc">granite3.1-dense model</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="features-inner">
          <div className="section-label">Features</div>
          <h2 className="section-title">What You Can Do</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Natural Language Search</h3>
              <p>Say "Show me 2BHK apartments in Mysuru under 50 lakhs" and get instant results.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>List Your Property</h3>
              <p>Upload photos and details through a simple form. Your listing goes live instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>Photo Galleries</h3>
              <p>Browse property images with an interactive gallery. See every detail before you visit.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>Intelligent requirement extraction and property matching powered by advanced AI models.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Chat Interface</h3>
              <p>Familiar WhatsApp-style chat. No complicated forms or filters to learn.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Results</h3>
              <p>Properties are displayed as rich cards with photos, price, location, and amenities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="cta-inner">
          <h2>Ready to Find Your Perfect Property?</h2>
          <p>Start a conversation with our AI assistant and discover properties that match your needs.</p>
          <button className="hero-btn-primary" onClick={onStartChat}>
            Launch Chat Assistant
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">🏢</span>
            <span>IVIS Property Listings</span>
          </div>
          <div className="footer-text">
            Powered by IVIS LABS &middot; AI-Driven Property Discovery
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
