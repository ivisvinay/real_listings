import React, { useState } from 'react';

const PropertyForm = ({ onSubmit, onClose, useGoogleForm = false, googleFormUrl = '' }) => {
  const [formData, setFormData] = useState({
    type: '',
    price: '',
    location: '',
    description: '',
    amenities: '',
    ownerName: '',
    images: null,
    video: null
  });

  const [imageNames, setImageNames] = useState([]);
  const [videoName, setVideoName] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'images') {
      setFormData(prev => ({
        ...prev,
        images: files
      }));
      const names = Array.from(files).map(f => f.name).join(', ');
      setImageNames(Array.from(files).map(f => f.name));
    } else if (name === 'video') {
      setFormData(prev => ({
        ...prev,
        video: files[0]
      }));
      setVideoName(files[0]?.name || '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Handle Google Form submission detection
  const handleGoogleFormLoad = () => {
    console.log('Google Form loaded');
  };

  // Listen for form submission completion
  React.useEffect(() => {
    if (useGoogleForm && googleFormUrl) {
      // Set up message listener for Google Form submission
      const handleMessage = (event) => {
        // Google Forms sends a message when submitted
        if (event.data === 'formSubmitted' || 
            (typeof event.data === 'string' && event.data.includes('formResponse'))) {
          setShowThankYou(true);
          setTimeout(() => {
            onSubmit({ source: 'google_form', submitted: true });
          }, 2000);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [useGoogleForm, googleFormUrl, onSubmit]);

  // Render Google Form iframe
  if (useGoogleForm && googleFormUrl) {
    return (
      <div className="property-form-overlay">
        <div className="property-form-container google-form-container">
          <div className="form-header">
            <h2>🏠 Property Listing Form</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          {showThankYou ? (
            <div className="form-content thank-you-message">
              <div className="thank-you-icon">✅</div>
              <h3>Thank You!</h3>
              <p>Your property details have been submitted successfully.</p>
              <p>Our team will review and get back to you shortly.</p>
            </div>
          ) : (
            <div className="google-form-wrapper">
              <iframe
                src={googleFormUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                onLoad={handleGoogleFormLoad}
                title="Property Listing Form"
              >
                Loading…
              </iframe>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original custom form
  return (
    <div className="property-form-overlay">
      <div className="property-form-container">
        <div className="form-header">
          <h2>🏠 Property Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="type">Property Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Office Space">Office Space</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 5000000"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Jayanagar, Bangalore"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your property..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amenities">Amenities</label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="e.g., Parking, Swimming Pool, Gym, Garden"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName">Owner Name *</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Property Images</label>
            <div className="file-input-wrapper">
              <label htmlFor="images" className="file-input-button">
                <span>📷</span>
                <span>Click to upload images</span>
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
              {imageNames.length > 0 && (
                <div className="file-name">
                  {imageNames.length} file(s): {imageNames.slice(0, 2).join(', ')}
                  {imageNames.length > 2 && ` +${imageNames.length - 2} more`}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="video">Property Video (Optional)</label>
            <div className="file-input-wrapper">
              <label htmlFor="video" className="file-input-button">
                <span>🎥</span>
                <span>Click to upload video</span>
              </label>
              <input
                type="file"
                id="video"
                name="video"
                onChange={handleFileChange}
                accept="video/*"
              />
              {videoName && (
                <div className="file-name">
                  {videoName}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
