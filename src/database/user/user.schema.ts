import { Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        enum: ["web1-user", "web1-admin"],
        default: "web1-user"
    }
});

export default UserSchema;