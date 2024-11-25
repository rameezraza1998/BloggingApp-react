import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase/configfirebase";

// Import the profile image
import profileImage from "../assets/profile.png";

function User() {
  const [singleuser, setSingleuser] = useState([]);
  const [username, setUsername] = useState("Loading...");
  const [bio, setBio] = useState(
    "This is a short bio about the user. It can include hobbies, interests, or a personal tagline!"
  );
  const { id } = useParams();

  useEffect(() => {
    const getDatafromDB = async () => {
      try {
        const q = query(
          collection(db, "data"),
          where("uid", "==", id)
        );

        const querySnapshot = await getDocs(q);
        const userBlogs = [];
        querySnapshot.forEach((doc) => {
          userBlogs.push({
            ...doc.data(),
            docid: doc.id,
          });
        });

        // If user data exists, set the username and bio dynamically
        if (userBlogs.length > 0) {
          setUsername(userBlogs[0].name || "No Username");
          setBio(userBlogs[0].bio || bio);
        }

        setSingleuser(userBlogs);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getDatafromDB();
  }, [id, bio]);

  return (
    <div className="bg-gradient-to-br from-blue-200 to-indigo-500 min-h-screen flex flex-col items-center p-6">
      {/* Profile Picture Section */}
      <div className="mt-16 flex flex-col items-center w-full max-w-3xl">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full w-40 h-40 border-4 border-white shadow-xl"
        />

        {/* User Info */}
        <div className="text-center mt-6 px-4">
          <h1 className="text-4xl font-semibold text-black">{username}</h1>
          <p className="mt-4 text-lg text-black opacity-90">{bio}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white opacity-50 my-8 w-full max-w-2xl"></div>

      {/* Blog Cards Section */}
      <div className="flex flex-col items-center justify-center py-8 w-full max-w-5xl">
        {singleuser.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 w-full">
            {singleuser.map((item) => (
              <div
                key={item.docid}
                className="card bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg hover:shadow-2xl transition-all w-full"
              >
                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold text-gray-800">
                    {item.title || "No Title Available"}
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
          <h1 className="text-center text-white text-3xl">
            No Blogs available...
          </h1>
        )}
      </div>
    </div>
  );
}

export default User;
