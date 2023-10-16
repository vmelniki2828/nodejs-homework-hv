const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validate");
const isValidId = require("../../middlewares/validateId");
const schemas = require("../../schema/contacts");

router.get("/", ctrl.listContacts);
router.post("/", validateBody(schemas.contactSchemaJoi), ctrl.addContact);

router.get("/:contactId", isValidId, ctrl.getContactById);
router.put(
    "/:contactId",
    isValidId,
    validateBody(schemas.contactSchemaJoi),
    ctrl.updateContact
);
router.delete("/:contactId", isValidId, ctrl.removeContact);

router.patch(
    "/:contactId/favorite",
    isValidId,
    validateBody(schemas.favoriteSchemaJoi, true),
    ctrl.updateContact
);

module.exports = router;