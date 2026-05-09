const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/contacts', contactsRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Contacts API is running. Use /contacts endpoint.');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Contacts endpoint: http://localhost:${PORT}/contacts`);
});