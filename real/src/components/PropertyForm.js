import React, { useState } from 'react';

const PropertyForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    type: '',
    price: '',
    location: '',
    description: '',
    amenities: '',
    ownerName: '',
    contactNumber: '',
    images: null
  });

  const [imageNames, setImageNames] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData(prev => ({
      ...prev,
      images: files
    }));
    setImageNames(Array.from(files).map(f => f.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

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
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
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

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
