import mongoose from 'mongoose'

//mongoose.connect(process.env.DSN);

const HandSchema = new mongoose.Schema({
    dealerHand: String,
    playerCardA: String,
    playerCardB: String
});

const madeHandSchema = new mongoose.Schema({
    dealerHand: String,
    playerHand: Number
});

export const Hand = mongoose.model('Hand', HandSchema);
export const madeHand = mongoose.model('madeHand', madeHandSchema);
//const Hand = mongoose.model('Hand');