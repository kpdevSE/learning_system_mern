const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    loggedUserEmail: { type: String, required: true },
    savedPrice: { type: String, required: true },
    savedLecturerEmail: { type: String, required: true },
    savedDuration: { type: String, required: true },
    savedQuantity: { type: Number, required: true },
    savedFullDescription: { type: String },
    savedSmallDescription: { type: String },
    savedTopicOne: { type: String },
    savedTopicTwo: { type: String },
    savedImageUrl: { type: String },
    savedUsername: { type: String },
    savedYoutubeUrl: { type: String },
    cardNumber: { type: String, required: true },
    exDate: { type: String, required: true },
    cvv: { type: String, required: true },
    cardHolderName: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("Payment", paymentSchema)