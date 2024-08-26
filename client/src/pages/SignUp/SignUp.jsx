import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${baseAPIURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        setFormData({
          username: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="flex justify-center items-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10 ">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl font-semibold mb-7 text-primary">
            Sign Up
          </h4>
          <div className="flex flex-col space-y-2">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input-box"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-box"
            required
          />
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            placeholder="Confirm Email"
            value={formData.confirmEmail}
            onChange={handleChange}
            className="input-box"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-box"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-box"
            required
          />
          <p className="p-2 text-gray-600">Have an Account ? {" "} <Link to="/login" className="text-indigo-700 font-semibold underline">Login</Link></p>
          <button
            type="submit"
            className="btn-primary mt-4"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
