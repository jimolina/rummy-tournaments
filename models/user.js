import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [ true, 'Email already exist!' ],
        required: [ true, 'Email is required!' ],
    },
    username: {
        type: String,
        required: [ true, 'Username is required!' ],
        // match: [
        //     /^[A-Za-z][A-Za-z0-9_@.()]{4,29}$/,
        //     "Username invalids, it should contain 8-40 alphanumeric letters and be unique!"
        // ]
    },
    image: {
      type: String,
    },
    profile: {
      type: String,
      default: 'player'
    }
});

const User = models.User || model( "User", UserSchema );

export default User;