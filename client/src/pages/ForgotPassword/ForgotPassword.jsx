import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from "../../utils/helper";
import { sendResetLink } from "../../services/auth"; // Ensure the path is correct

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        
        try {
            const result = await sendResetLink(email);
            
            if (result.status) {
                setSuccessMessage("Password reset instructions have been sent to your email.");
            } else {
                setError(result.message || 'Failed to send reset link.');
            }
        } catch (error) {
            setError('An unexpected error occurred.');
            console.error('Error sending reset link:', error);
        }
    };

    return (
        <div className="flex justify-center items-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-2xl font-semibold mb-7 text-primary">Forgot Password</h4>
                    <div className="flex flex-col space-y-2">
                        <input
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                            className="input-box"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <button type="submit" className="btn-primary">
                        Send Reset Link
                    </button>
                </form>
                <p className="text-sm mt-4 text-center">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-700 font-semibold underline"
                    >
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
