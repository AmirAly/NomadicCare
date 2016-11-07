var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Organization = new Schema({
    Name: {
        type: String,
        required: [true, 'User phone number required']
    },
    Location: { type: String },
    PostalCode: { type: String },
    Phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    Mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    SmsNotificationsEnabled: { type: String },
    Speciality: [{
        Name: { type: String },
        Description: { type: String },
    }],
});
module.exports = Mongoose.model('Organization', Organization);