import { Schema, model, models } from "mongoose";

const TournamentSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    name: {
        type: String,
        require: [ true, 'Name is required!' ],
    },

    start_date: {
        type: String,
        require: [ true, 'Start Date is required!' ],
    },

    // players: [{
    //     type: String,
    // }]
});

const Tournament = models.Tournament || model( 'Tournament', TournamentSchema );

export default Tournament;
