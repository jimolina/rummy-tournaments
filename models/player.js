import { Schema, model, models } from "mongoose";

const PlayerSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    name: {
        type: String,
        require: [ true, 'Name is required!' ],
    },

    email: {
        type: String,
        unique: [ true, 'Email already exist!' ],
        required: [ true, 'Email is required!' ],
    },

    avatar: {
        data: Buffer,
        type: String
    }
});

const Player = models.Player || model( 'Player', PlayerSchema );

export default Player;
