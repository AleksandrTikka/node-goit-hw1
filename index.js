const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
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
      const deletedContact = removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const start = async (argv) => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error.message);
  }
};

start(argv);
