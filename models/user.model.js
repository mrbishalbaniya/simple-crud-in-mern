const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
    // 1. Only hash if the password is new or being changed
    if (!this.isModified('password')) return; 

    try {
        // 2. Generate salt and hash
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Note: No next() here! Mongoose handles it via the async return.
    } catch (err) {
        throw new Error(err); // Mongoose will catch this as a validation error
    }
});

// Helper method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);