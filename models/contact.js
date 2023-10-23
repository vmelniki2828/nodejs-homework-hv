const { Schema, model } = require("mongoose");
const errMsg = require("../consts/errors");
const regexp = require("../consts/regexps");
const handleSaveError = require("../helpers/handleSaveError");

const contactSchemaMongoose = new Schema(
    {
        name: {
            type: String,
            minlength: [3, errMsg.errMsgMin],
            maxlength: [50, errMsg.errMsgMax],
            required: [true, errMsg.errFieldIsrequired("Name")],
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return regexp.emailRegexp.test(v);
                },
                message: (props) =>
                    `${props.value} ${errMsg.errMsgEmailRegexp}`,
            },
            required: [true, errMsg.errFieldIsrequired("Email")],
        },
        phone: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return regexp.phoneRegexp.test(v);
                },
                message: (props) =>
                    `${props.value} ${errMsg.errMsgPhoneRegexp}`,
            },
            required: [true, errMsg.errFieldIsrequired("Phone number")],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, errMsg.errFieldIsrequired("Owner")],
        },
    },
    { versionKey: false, timestamps: true }
);

// for error add (post)
contactSchemaMongoose.post("save", handleSaveError);

// for error update (put)
contactSchemaMongoose.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchemaMongoose);

module.exports = Contact;