import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase/configfirebase";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";

function Register() {
  const email = useRef();
  const password = useRef();
  const Fname = useRef();
  const navigate = useNavigate()

  function registerUser(event) {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
    // console.log(Fname.current.value);

    const userFirstname = Fname.current.value;
    

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      const user = userCredential.user;

      // Update the user profile with displayName
      updateProfile(user, {
        displayName: userFirstname
      })
        .then(() => {
          console.log("User profile updated with name:", user.displayName);
          navigate('/login'); // Navigate to login page
        })
        .catch((error) => {
          console.error("Error updating user profile:", error.message);
        });
    })
    .catch((error) => {
      console.error("Error creating user:", error.message);
    });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          Create an Account
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Fill in the details below to register.
        </p>
        <form onSubmit={registerUser} className="space-y-4">
          {/* First Name */}
          <div className="form-control">
            <label htmlFor="Fname" className="label">
              <span className="label-text text-gray-300">First Name:</span>
            </label>
            <input
              type="text"
              id="Fname"
              ref={Fname}
              placeholder="Enter your first name"
              className="input input-bordered w-full bg-gray-700 text-gray-200"
            />
          </div>
          {/* Last Name */}
          <div className="form-control">
            <label htmlFor="Lname" className="label">
              <span className="label-text text-gray-300">Last Name:</span>
            </label>
            <input
              type="text"
              id="Lname"
              placeholder="Enter your last name"
              className="input input-bordered w-full bg-gray-700 text-gray-200"
            />
          </div>
          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-gray-300">Email:</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={email}
              className="input input-bordered w-full bg-gray-700 text-gray-200"
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label htmlFor="pass" className="label">
              <span className="label-text text-gray-300">Password:</span>
            </label>
            <input
              type="password"
              id="pass"
              placeholder="Enter your password"
              ref={password}
              className="input input-bordered w-full bg-gray-700 text-gray-200"
            />
          </div>
          {/* Register Button */}
          <button className="btn btn-primary w-full">Register</button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
