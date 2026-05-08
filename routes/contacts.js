const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById } = require('../controllers/contactController');

// GET all contacts
router.get('/', getAllContacts);

// GET one contact by ID
router.get('/:id', getContactById);

module.exports = router;