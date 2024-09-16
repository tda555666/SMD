import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from "../../services/auth";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Get the token from query parameters
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await resetPassword(token, newPassword);

            if (result.status === 200) {
                setSuccessMessage('Password has been reset successfully. You can now log in.');
            } else {
                setError(result.message || 'Failed to reset password.');
            }
        } catch (error) {
            setError('An unexpected error occurred.');
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="flex justify-center items-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10">
                <form onSubmit={handleSubmit}>
                    <h4 className="text-2xl font-semibold mb-7 text-primary">Reset Password</h4>
                    <div className="flex flex-col space-y-2">
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={handleChange}
                            className="input-box"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <button type="submit" className="btn-primary">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
