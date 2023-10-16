const { Schema, model } = require("mongoose");
const err = require("../consts/err");
const reg = require("../consts/reg");
const saveErr = require("../helpers/saveErr");

const contactSchemaMongoose = new Schema(
  {
    name: {
      type: String,
      minlength: [3, err.errMsgMin],
      maxlength: [50, err.errMsgMax],
      required: [true, err.errMsgNameRequired],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return reg.emailRegexp.test(v);
        },
        message: (props) => `${props.value} ${err.errMsgEmailRegexp}`,
      },
      required: [true, err.errMsgEmailRequired],
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return reg.phoneRegexp.test(v);
        },
        message: (props) => `${props.value} ${err.errMsgPhoneRegexp}`,
      },
      required: [true, err.errMsgPhoneRequired],
    },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

// for error add (post)
contactSchemaMongoose.post("save", saveErr);

// for error update (put)
contactSchemaMongoose.post("findOneAndUpdate", saveErr);

const Contact = model("contact", contactSchemaMongoose);

module.exports = Contact;
