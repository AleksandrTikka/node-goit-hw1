const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
    // return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const idString = String(contactId);
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
    const contacts = await listContacts();
    const idString = String(contactId);

    const index = contacts.findIndex((contact) => contact.id === idString);
    if (index === -1) {
      console.log(`There is no contact with ID: ${contactId}`);
      return null;
    }
    const [deletedContact] = contacts.splice(index, 1);

    const newData = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newData);
    console.log(`Contact with ID: ${contactId} has been removed successfully!`);
    console.log(`Removed contact: ${deletedContact}`);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();

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
