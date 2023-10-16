const contacts = require("../models/contacts");

const wrapper = require("../helpers/Wrapper");
const httpError = require("../helpers/HttpError");

const getListContacts = async (req, res, next) => {
  const result = await contacts.find({});
  res.json(result);
};

const getContactById = async (req, res) => {
  const result = await contacts.findById(req.params.contactId);
  if (!result) {
    throw httpError("Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const result = await contacts.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw httpError(404);
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  listContacts: wrapper(getListContacts),
  getContactById: wrapper(getContactById),
  addContact: wrapper(addContact),
  removeContact: wrapper(removeContact),
  updateContact: wrapper(updateContact),
};
