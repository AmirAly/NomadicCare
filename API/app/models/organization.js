var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Organization = new Schema({
    Name: {
        type: String,
        required: [true, 'Organization name required']
    },
    Location: { type: String },
    PostalCode: { type: String },
    Phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /[0][^\D4]\d{6}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    Mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /[0][4]\d{6}$/.test(v);
            },
            message: '{VALUE} is not a valid mobile number!'
        },
    },
    Email: { type: String },
    SmsNotificationsEnabled: { type: String },
    Speciality: [{
        Name: { type: String },
        Description: { type: String },
    }],
});
module.exports = Mongoose.model('Organization', Organization);