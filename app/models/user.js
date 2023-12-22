// user.js
const Mongoose = require("mongoose")
const Schema = Mongoose.Schema;

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    email_verified_at: {
        type: Date,
        default: Date.now,
        required: false,
    },
    role: {
        type: String,
        default: "Basic",
        required: true,
    },
});


UserSchema.pre('updateOne', function (next) {
    this.set({ updated_at: new Date() });
    next();
});

// Create the 'Note' model based on the schema
const User = Mongoose.model('User', UserSchema);

module.exports = User;