var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Client = new Schema({
    Coordinator: {
        type: Schema.Types.ObjectId,
        ref: 'Coordinator'
    },
    FirstName: {
        type: String,
        required: [true, 'User phone number required']
    },
    LastName: {
        type: String,
        required: [true, 'User phone number required']
    },
    Mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    DateOfBirth: { type: Date, min: ['1920/1/1', 'Date is too old'] },
    Gender: { type: Number, min: 0, max: 1 },
    BloodType: { type: String },
    Img: { type: String },
    RetrivalCode: { type: String },
    HealthNotes: [{}],
    ConsultationNotes: [
        {
            Date: { type: Date, default: new Date() },
            ClinicalReason: { type: String },
            Examination: { type: String },
            Treatment: { type: String },
            Status: { type: Number },
            Type: { type: String }
        }
    ],

});
module.exports = Mongoose.model('Client', Client);