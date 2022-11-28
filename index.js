const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

listContacts();
getContactById(3);
removeContact(1);
addContact("Aleksandr", "aleksandr@mail.com", 0666665544);
