import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db,auth } from "../config/firebase/configfirebase"; 

// Import the profile image
import profileImage from "../assets/profile.png";

const Profile = () => {
  const [data, setData] = useState([]); // State for blog data
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [bio, setBio] = useState(
    "This is a short bio about the user. It can include hobbies, interests, or a personal tagline!"
  );

  useEffect(() => {
    const profileName = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "No Username");
        setEmail(user.email || "No Email");
      }
    });

    const getDatafromDB = async () => {
      const q = query(
        collection(db, "data"),
        where("uid", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({
          ...doc.data(),
          docid: doc.id,
        });
      });

      // Update the state with fetched blogs
      setData(blogs);
    };

    if (auth.currentUser) {
      getDatafromDB(); // Call the function to get data if the user is logged in
    }

    return () => profileName();
  }, []); // Empty dependency array to ensure this effect runs only once

  return (
    <div className="bg-gradient-to-br from-blue-200 to-indigo-500 min-h-screen flex flex-col items-center p-6">
      {/* Profile Picture Section */}
      <div className="mt-16 flex flex-col items-center w-full max-w-3xl">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full w-40 h-40 border-4 border-white shadow-xl"
        />

        {/* Profile Info */}
        <div className="text-center mt-6 px-4">
          <h1 className="text-4xl font-semibold text-black">{username}</h1>
          <p className="text-lg text-black opacity-80">{email}</p>
          <p className="mt-4 text-lg text-black opacity-90">{bio}</p>
        </div>

        {/* Follow Button */}
        <div className="mt-6">
          <button className="btn btn-primary px-8 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
            Follow
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white opacity-50 my-8 w-full max-w-2xl"></div>

      {/* Blog Cards Section */}
      {/* Blog Cards Section */}
      <div className="flex flex-col items-center justify-center py-8 w-full max-w-5xl">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 w-full">
            {data.map((item) => (
              <div
                key={item.docid}
                className="card bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg hover:shadow-2xl transition-all w-full"
              >
                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 mt-2">
                    {item.text || "No description available."}
                  </p>
                  <p className="text-gray-700 mt-2">
                    Posted at:{" "}
                    {item.timeStamp
                      ? new Date(item.timeStamp.seconds * 1000).toLocaleString()
                      : "Date not available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-center text-black text-3xl">
            No Blogs available...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
