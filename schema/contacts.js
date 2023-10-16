const Joi = require("joi");
const err = require("../consts/err");
const reg = require("../consts/reg");

const contactSchemaJoi = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.min": err.errMsgMin,
        "string.max": err.errMsgMax,
        "string.empty": err.errMsgNameRequired,
        "any.required": err.errMsgNameRequired,
    }),
    email: Joi.string()
        .pattern(reg.emailRegexp)
        .required()
        .messages({
            "string.pattern.base": `{email} ${err.errMsgEmailRegexp}`,
            "string.empty": err.errMsgNameRequired,
            "any.required": err.errMsgEmailRequired,
        }),
    phone: Joi.string()
        .pattern(reg.phoneRegexp)
        .required()
        .messages({
            "string.pattern.base": `{phone} ${err.errMsgPhoneRegexp}`,
            "string.empty": err.errMsgNameRequired,
            "any.required": err.errMsgPhoneRequired,
        }),
    favorite: Joi.boolean(),
});



const favoriteSchemaJoi = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": err.errMsgFavoriteRequired,
    }),
});

const schemas = {
    contactSchemaJoi,
    favoriteSchemaJoi,
};

module.exports = schemas;