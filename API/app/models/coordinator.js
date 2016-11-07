var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Coordinator = new Schema({
    Organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
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
    DateOfBirth: { type: Date, min: ['1920/1/1', 'Date is too old'] },
    Gender: { type: Number, min: 0, max: 1 },
    Speciality: [{
        Name: { type: String },
        Description: { type: String },
    }],
    Practice: [{
        Name: { type: String },
        Description: { type: String },
    }],
    Status: { type: String },
    RetrivalCode: { type: String },
    Email: { type: String, required: 'Email is required' },
    Password: { type: String, required: 'Email is required', min: [5, 'Must be more than 5 charachters'] }

});
module.exports = Mongoose.model('Coordinator', Coordinator);