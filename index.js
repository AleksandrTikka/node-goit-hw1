const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
