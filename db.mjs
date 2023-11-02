import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/mydb');

const HandSchema = new mongoose.Schema({
    dealerHand: Number,
    playerHand: String,
    value: Number,
    soft: Boolean,
    action: String,
    reason: String
});

mongoose.model('Hand', HandSchema);
const Hand = mongoose.model('Hand');