import mongoose from 'mongoose'

//mongoose.connect(process.env.DSN);

const HandSchema = new mongoose.Schema({
    dealerHand: String,
    playerCardA: String,
    playerCardB: String
});

export const Hand = mongoose.model('Hand', HandSchema);
//const Hand = mongoose.model('Hand');