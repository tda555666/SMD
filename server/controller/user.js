const User = require("../model/user");
const { hashP } = require("../services/encrypt")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();



const userController = {

    register: async function(req, res) {
        try {
            const { username, email, password } = req.body;

            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ error: "Username or Email already exists" });
            }
            const hashedPassword = await hashP(password);

            const user = new User({ username, email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ err: "Internal error" });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const hashedPassword = await hashP(req.body.password);

            const updatedUser = await User.findByIdAndUpdate(req.params.userId, 
                { password: hashedPassword }, { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            console.error("Error updating password:", err);
            res.status(500).json({ err: err.message });
        }
    },

    deleteRefresh: async (req, res) => {
        try {
            const userId = req.params.userId;

            let user = await User.findById(userId);

            if (user.refreshToken) {
                user.refreshToken = "";

                // Save the updated user document
                const updatedUser = await user.save();
                res.status(200).json({ message: "Refresh token removed", updatedUser });
            } else {
                res.status(404).json({ message: "No refresh token found" });
            }
        } catch (err) {
            console.error("Error deleting refresh token:", err);
            res.status(500).json({ error: err.message });
        }
    },

    // New methods for password reset

    requestPasswordReset: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate a reset token
            const token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            await user.save();

            // Send reset email
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.APP_PASS,
                },
            });

            const resetLink = `http://localhost:5173/reset-password?token=${token}`;

            await transporter.sendMail({
                from: {
                    name: 'ToDo App Admin',
                    address: process.env.EMAIL_USER
                },
                to: email,
                subject: 'Password Reset',
                html: `You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.`,
            });

            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            console.error("Error sending reset link:", error);
            res.status(500).json({ message: 'Error sending email' });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { token, newPassword } = req.body;

            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
            }

            const hashedPassword = await hashP(newPassword);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.status(200).json({ message: 'Password has been reset' });
        } catch (error) {
            console.error("Error resetting password:", error);
            res.status(500).json({ message: 'Error resetting password' });
        }
    },
};

module.exports = userController;