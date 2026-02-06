const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'properties.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://real.ivislabs.in'
  ],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, png, gif, webp) are allowed'));
    }
  }
});

// Helper: read properties
function readProperties() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper: write properties
function writeProperties(properties) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2));
}

// GET /api/properties — list all properties
app.get('/api/properties', (req, res) => {
  const properties = readProperties();
  res.json(properties);
});

// GET /api/properties/:id — get single property
app.get('/api/properties/:id', (req, res) => {
  const properties = readProperties();
  const property = properties.find(p => p.id === req.params.id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

// POST /api/properties — create a new property with images
app.post('/api/properties', upload.array('images', 10), (req, res) => {
  try {
    const { type, price, location, description, amenities, ownerName, contactNumber } = req.body;

    if (!type || !price || !location || !ownerName) {
      return res.status(400).json({ error: 'Missing required fields: type, price, location, ownerName' });
    }

    const images = (req.files || []).map(file => `/uploads/${file.filename}`);

    const property = {
      id: `prop_${Date.now()}_${Math.round(Math.random() * 1e4)}`,
      type,
      price,
      location,
      description: description || '',
      amenities: amenities || '',
      ownerName,
      contactNumber: contactNumber || '',
      images,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    const properties = readProperties();
    properties.push(property);
    writeProperties(properties);

    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// DELETE /api/properties/:id — delete a property
app.delete('/api/properties/:id', (req, res) => {
  const properties = readProperties();
  const index = properties.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Property not found' });
  }

  // Delete associated images
  const property = properties[index];
  (property.images || []).forEach(imgPath => {
    const fullPath = path.join(__dirname, imgPath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  });

  properties.splice(index, 1);
  writeProperties(properties);
  res.json({ message: 'Property deleted' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Property server running on http://0.0.0.0:${PORT}`);
  console.log(`Uploads served from: ${uploadsDir}`);
});
