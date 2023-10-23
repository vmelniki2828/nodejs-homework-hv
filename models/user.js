const { Schema, model } = require("mongoose");
const errMsg = require("../consts/errors");
const regexp = require("../consts/regexps");
const con = require("../consts/variables");
const handleSaveError = require("../helpers/handleSaveError");

const userSchemaMongoose = new Schema(
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
        password: {
            type: String,
            minlength: [3, errMsg.errMsgMinPass],
            required: [true, errMsg.errFieldIsrequired("Password")],
        },
        subscription: {
            type: String,
            enum: con.subscriptionList,
            default: "starter",
        },
        avatarURL: {
            type: String,
            required: [true, errMsg.errFieldIsrequired("Avatar image")],
        },
        token: String,
    },
    { versionKey: false, timestamps: true }
);

// for error add (post)
userSchemaMongoose.post("save", handleSaveError);

const User = model("user", userSchemaMongoose);

module.exports = User;