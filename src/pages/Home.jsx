import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase/configfirebase.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.png";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial state to true
  const navigate = useNavigate();

  useEffect(() => {
    const getDatafromDB = async () => {
      setLoading(true); // Start loading
      const q = query(collection(db, "data"), orderBy("timeStamp", "desc"));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({
          ...doc.data(),
          docid: doc.id,
        });
      });
      setData(newData);
      setLoading(false); // Stop loading
    };
    getDatafromDB();
  }, []);

  const singleUserBlog = async (item) => {
    if (auth.currentUser) {
      navigate(`/User/${item.uid}`);
      return;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-indigo-500 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center text-5xl text-black">All Blogs</h1>
      <div className="flex flex-col items-center justify-center py-8 w-full max-w-7xl">
        {loading ? ( // Display DaisyUI spinner while data is being fetched
          <div className="flex items-center justify-center h-40">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 w-full">
            {data.map((item) => (
              <div
                key={item.docid}
                className="card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all w-full"
              >
                <div className="card-body p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={profileImage} // Placeholder image if no photoURL
                      alt={`${item.name}'s profile`}
                      className="w-12 h-12 rounded-md border-2 border-gray-300"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.name || "Unknown"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {item.timeStamp
                          ? new Date(
                              item.timeStamp.seconds * 1000
                            ).toLocaleString()
                          : "Date not available"}
                      </p>
                    </div>
                  </div>
                  <h2 className="card-title text-2xl font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 mt-2">
                    {item.text || "No description available."}
                  </p>
                  <Link
                    className="text-blue-900"
                    onClick={() => {
                      singleUserBlog(item);
                    }}
                  >
                    See all blogs from {item.name}
                  </Link>
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
}

export default Home;
