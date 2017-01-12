var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Client = new Schema({
    Coordinator: {
        type: Schema.Types.ObjectId,
        ref: 'Coordinator'
    },
    FirstName: {
        type: String,
        required: [true, 'Firstname is required']
    },
    LastName: {
        type: String,
        required: [true, 'Lastname is required']
    },
    Mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /[0][4]\d{6}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    DateOfBirth: { type: Date, min: ['1920/1/1', 'Date is too old'] },
    Gender: { type: Number, min: 0, max: 1 },
    BloodType: { type: String },
    Img: { type: String },
    RetrivalCode: { type: String },
    Email: { type: String },
    HealthNotes: [{}],
    HealthMeasurments: [{}],
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
    CarePlans: [
        {
            PlanName: { type: String },
            ToImprove: { type: String },
            ToAchieve1: { type: String },
            ToAchieve2: { type: String },
            AgreedActions1: { type: String },
            AgreedActions2: { type: String },
            ByWho1: {
                Name: {type: String},
                Email: {type: String}
            },
            ByWho2: {
                Name: { type: String },
                Email: { type: String }
            },
            ByWhen1: { type: Date },
            ByWhen2: { type: Date },
            Progress: [],
            OtherPlan: { type: String },
            OtherConsideration: { type: String },
            Reason: { type: String },
            Provider: {
                type: Schema.Types.ObjectId,
                ref: 'Coordinator'
            },
            Status: { type: String },
            PatientAgree: { type: Boolean },
            LastUpdated: {
                type: Date, default: new Date()
            },
            IsNew: { type: Boolean }
        }
    ]

});
module.exports = Mongoose.model('Client', Client);