import React, { useState } from 'react';
import { propertyService } from '../services/propertyService';

const PropertyCard = ({ property }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = property.images || [];

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="property-card">
      {images.length > 0 && (
        <div className="property-card-gallery">
          <img
            src={propertyService.getImageUrl(images[currentImage])}
            alt={`${property.type} in ${property.location}`}
            className="property-card-image"
          />
          {images.length > 1 && (
            <>
              <button className="gallery-nav gallery-prev" onClick={prevImage}>‹</button>
              <button className="gallery-nav gallery-next" onClick={nextImage}>›</button>
              <div className="gallery-dots">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`gallery-dot ${i === currentImage ? 'active' : ''}`}
                    onClick={() => setCurrentImage(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="property-card-body">
        <div className="property-card-header">
          <span className="property-card-type">{property.type}</span>
          <span className="property-card-price">₹{propertyService.formatPrice(property.price)}</span>
        </div>

        <div className="property-card-location">📍 {property.location}</div>

        {property.description && (
          <div className="property-card-desc">{property.description}</div>
        )}

        {property.amenities && (
          <div className="property-card-amenities">
            {property.amenities.split(',').map((a, i) => (
              <span key={i} className="amenity-tag">{a.trim()}</span>
            ))}
          </div>
        )}

        <div className="property-card-footer">
          <span className="property-card-owner">👤 {property.ownerName}</span>
          {property.contactNumber && (
            <span className="property-card-contact">📞 {property.contactNumber}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
