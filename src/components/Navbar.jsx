import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase/configfirebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();


  const logOff = () => {
    const user = auth.currentUser; // Declare user properly
    if (user) {
      signOut(auth)
        .then(() => {
          console.log("User is signed out");
          navigate("/login"); 
        })
        .catch((error) => {
          console.error("Sign out error:", error);
        });
    } else {
      console.log("No user is signed in.");
    }
  };
  


  return (
    <div className="navbar bg-sky-600">
      <div className="flex-1">
        <Link to="" className="btn btn-ghost text-white text-xl">
          Personal Blogging App
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="profile" className="justify-between text-white">
                Profile
              </Link>
            </li>
            <li>
              <Link to="" className="text-white">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
            </li>
            <li>
              <Link to="login" className="text-white" onClick={logOff}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
