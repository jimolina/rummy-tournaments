import { Schema, model, models } from "mongoose";

const scoresToSave = new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    score: { type: Number }
});

const ScoreSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    tournament: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
    },

    date: {
        type: Date,
        require: [ true, 'Date is required!' ],
    },

    scores: [scoresToSave],
});

const Score = models.Score || model( 'Score', ScoreSchema );

export default Score;
