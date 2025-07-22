import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

   const navigate = useNavigate(); 

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const passwordsMatch = password === confirmPassword;

  const handleSignup = async (e) => {
  e.preventDefault();

  if (!passwordsMatch) return toast.error("Passwords do not match");

  try {
    const response = await axios.post("https://e-commercer-website-for-clothes-backend.onrender.com/api/user/register", {
      name,
      email,
      password,
    });

    if (response.data.success) {
      toast.success("Registration successful!");
      navigate("/login")
      console.log(response.data);
      
    } else {
      toast.error(response.data.message || "Registration failed");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border ${
                confirmPassword && !passwordsMatch ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 ${
                confirmPassword && !passwordsMatch
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="••••••••"
              required
            />
            {!passwordsMatch && confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!passwordsMatch}
            className={`w-full ${
              passwordsMatch
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-medium py-2 px-4 rounded-lg transition duration-300`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
