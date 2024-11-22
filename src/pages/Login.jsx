import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase/configfirebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const email = useRef();
  const pass = useRef();
  const navigate = useNavigate();

  function loginUser(event) {
    event.preventDefault();
    console.log(email.current.value);
    console.log(pass.current.value);

  
    const emailValue = email.current.value;
    const passwordValue = pass.current.value;

    // Validate if fields are empty
    if (!emailValue || !passwordValue) {
      setErrorMessage("Please fill out both fields!");
      return;
    }

    // Loggin In || SignUp
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;

        const uid = user.uid;
        console.log("Display Name:", user.displayName);
        console.log("Logged in", user);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Invalid email or password");
        console.log(errorMessage); // Log for debugging
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Please log in to continue.
        </p>
        <form onSubmit={loginUser} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-gray-300">Email:</span>
            </label>
            <input
              type="email"
              id="email"
              ref={email}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-700 text-gray-200"
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text text-gray-300">Password:</span>
            </label>
            <input
              type="password"
              id="password"
              ref={pass}
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-700 text-gray-200"
            />
          </div>
          {/* Login Button */}
          <button className="btn btn-primary w-full">Log In</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
