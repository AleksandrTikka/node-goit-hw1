const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const contacts = await listContacts();

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const idString = contactId.toString();
    const contactById = contacts.find((contact) => contact.id === idString);
    if (!contactById) {
      console.log(`There is no contact with ID: ${contactId}`);
      return null;
    }
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const selectedContact = await getContactById();
    if (!selectedContact) {
      console.log(`There is no contact with ID: ${contactId}`);
      return null;
    }

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const newData = JSON.stringify(filteredContacts);
    await fs.writeFile(contactsPath, newData);
    // console.log(`Contact with ID: ${contactId} has been removed successfully!`);
    // console.log(`Removed contact: ${selectedContact}`);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    const newData = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newData);
    console.log(newData);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
