const Contact = require('../models/Contact');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Create a new contact
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Check if all required fields are present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ 
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' 
      });
    }
    
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });
    
    const savedContact = await newContact.save();
    res.status(201).json({ id: savedContact._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Update a contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, email, favoriteColor, birthday },
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};