const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

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
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);
    if (!contactById) {
      console.log(`There is no contact with ID: ${contactId}`);
      return;
    }
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const selectedContact = await getContactById();
    if (!selectedContact) {
      console.log(`There is no contact with ID: ${contactId}`);
      return;
    }

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const newData = JSON.stringify(filteredContacts);
    await fs.writeFile(contactsPath, newData);
    console.log(`Contact with ID: ${contactId} has been removed successfully!`);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    const newData = JSON.stringify([newContact, ...contacts]);
    await fs.writeFile(contactsPath, newData, "utf-8");
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
