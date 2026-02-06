const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const propertyService = {
  // Fetch all properties from backend
  async fetchProperties() {
    const res = await fetch(`${API_BASE}/api/properties`);
    if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);
    return res.json();
  },

  // Submit a new property with images
  async createProperty(formData) {
    const data = new FormData();
    data.append('type', formData.type);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('description', formData.description || '');
    data.append('amenities', formData.amenities || '');
    data.append('ownerName', formData.ownerName);
    data.append('contactNumber', formData.contactNumber || '');

    // Append image files
    if (formData.images) {
      const files = Array.from(formData.images);
      files.forEach(file => {
        data.append('images', file);
      });
    }

    const res = await fetch(`${API_BASE}/api/properties`, {
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to create property: ${res.status}`);
    }

    return res.json();
  },

  // Get image URL from path
  getImageUrl(imagePath) {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE}${imagePath}`;
  },

  // Filter properties locally
  filterProperties(properties, criteria) {
    return properties.filter(prop => {
      if (criteria.type && !prop.type.toLowerCase().includes(criteria.type.toLowerCase())) {
        return false;
      }
      if (criteria.location && !prop.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false;
      }
      if (criteria.minPrice && parseFloat(prop.price) < parseFloat(criteria.minPrice)) {
        return false;
      }
      if (criteria.maxPrice && parseFloat(prop.price) > parseFloat(criteria.maxPrice)) {
        return false;
      }
      return true;
    });
  },

  // Format price in Indian numbering
  formatPrice(price) {
    const num = parseFloat(price);
    if (isNaN(num)) return price;
    return num.toLocaleString('en-IN');
  }
};
