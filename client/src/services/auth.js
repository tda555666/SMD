import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Set global configurations for Axios
const config = {
  headers: {
    "content-type": 'application/json;charset=utf-8'
  }
};

// Get Auth config with Authorization Header
const getAuthConfig = () => {
  const accessToken = localStorage.getItem('auth-access-token');
  if (accessToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${accessToken}`
      }
    };
  }
  return config;
};

export const login = async (formData) => {
  try {
    const result = await axios.post(`${window.baseAPIURL}/login`, formData);
    console.log(result);

    const { accessToken, refreshToken } = result.data;
    const decoded = jwtDecode(accessToken);
    console.log(decoded);

    localStorage.setItem('auth-access-token', accessToken);
    localStorage.setItem('auth-refresh-token', refreshToken);
    localStorage.setItem('smdUser', JSON.stringify(decoded));

    return { status: true, msg: 'Login is successful' };

  } catch (err) {
    if (err.response) {
      console.error('Response error:', err.response.data);
      console.error('Response status:', err.response.status);
      console.error('Response headers:', err.response.headers);
      return { status: false, msg: err.response.data.message || 'An error occurred' };
    } else if (err.request) {
      console.error('Request error:', err.request);
      return { status: false, msg: 'No response received from server' };
    } else {
      console.error('Error message:', err.message);
      return { status: false, msg: err.message };
    }
  }
};

export const refresh = async (userId, setUser) => {
  const refreshToken = localStorage.getItem('auth-refresh-token');

  if (!refreshToken) {
    console.log('No refresh token in local storage');
    return { success: false };
  }

  console.log('Going to refresh access token');

  try {
    const result1 = await axios.patch(
      `${window.baseAPIURL}/user/refresh-token`,
      { userId, refreshToken },
      getAuthConfig()
    );
    console.log('Result after sending the request:', result1);

    localStorage.setItem('auth-access-token', result1.data.accessToken);
    localStorage.setItem('auth-refresh-token', result1.data.refreshToken);
    return { success: true };

  } catch (err) {
    console.log('Error message in the refresh:', err.response?.data?.msg);
    logout(setUser);
    return { success: false };
  }
};

export const logout = async (setUser) => {
  const user = JSON.parse(localStorage.getItem('smdUser'));

  if (!user) {
    return { success: false };
  }

  try {
    await axios.patch(`${window.baseAPIURL}/user-delete-refresh/${user.id}`);

    localStorage.removeItem('auth-access-token');
    localStorage.removeItem('auth-refresh-token');
    localStorage.removeItem('smdUser');

    setUser({ role: 'guest' });

    return { success: true };

  } catch (err) {
    return { success: false };
  }
};

export const sendResetLink = async (email) => {
    try {
      const result = await axios.post(`${window.baseAPIURL}/forgot-password`, { email });
      return result.data; // Ensure your API returns data with a 'status' field
    } catch (err) {
      console.error('Error sending reset link:', err);
      // Provide more specific messages based on the error
      if (err.response) {
        return {
          status: false,
          message: err.response.data.message || 'Failed to send reset link'
        };
      } else if (err.request) {
        return {
          status: false,
          message: 'No response received from server'
        };
      } else {
        return {
          status: false,
          message: 'An unexpected error occurred: ' + err.message
        };
      }
    }
  };

export const resetPassword = async (token, newPassword) => {
  try {
      const response = await fetch(`${window.baseAPIURL}/reset-password`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Failed to reset password.');
      }

      return await response.json();
  } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
  }
};
