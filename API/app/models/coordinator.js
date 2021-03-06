var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Coordinator = new Schema({
    Organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    Name: {
        type: String,
        required: [true, 'User name required']
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
    Img: { type: String },
    Password: { type: String, required: 'Password is required', min: [5, 'Must be more than 5 charachters'] },
    ClinicName: { type: String }


});
module.exports = Mongoose.model('Coordinator', Coordinator);