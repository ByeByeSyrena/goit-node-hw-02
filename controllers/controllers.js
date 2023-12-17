const fs = require("fs").promises;
const crypto = require("crypto");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

exports.getUsers = async (req, res) => {
  try {
    const { contacts } = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const id = crypto.randomBytes(16).toString("hex");
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    await addContact(newContact);
    res.status(200).json({
      msg: "Success!",
      contact: newContact,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const contact = await getContactById(req.contact.id);
    res.status(200).json({
      contact,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeUser = async (req, res) => {
  try {
    await removeContact(req.contact.id);
    const { updatedContacts } = await removeContact(req.contact.id);
    res.status(200).json({
      message: "contact deleted",
      updatedContacts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await updateContact(req.contact.id, req.contact.body);
    const { name, email, phone, id } = await updateContact(
      req.contact.id,
      req.contact.body
    );

    res.status(200).json({
      contact: {
        name,
        email,
        phone,
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};