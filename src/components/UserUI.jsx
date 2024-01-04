/* eslint-disable react/prop-types */
import { useState } from "react";
import { authenticateUser } from "../slices/Authenticate";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserUI = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // calling handle login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Dispatch the authenticateUser action with the token
        dispatch(authenticateUser({ token: data.token, username : data.username}));
        navigate("/products")
        
      } else {
        // Handle login error
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login Here!
        </h2>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="********"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        {loginError && (
          <div className="mt-4 text-red-500 text-center">{loginError}</div>
        )}
      </div>
    </div>
  );
};

export default UserUI;