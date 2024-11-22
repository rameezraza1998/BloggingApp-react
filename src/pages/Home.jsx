import React, { useState, useEffect } from 'react';
import { auth, db } from "../config/firebase/configfirebase.js";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const getDatafromDB = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({
          ...doc.data(),
          docid: doc.id,
        });
      });
      setData(newData);
    };
    getDatafromDB();
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-blue-200 to-indigo-500 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center text-5xl text-white">Home</h1>
      <div className="flex flex-col items-center justify-center py-8 w-full max-w-7xl">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={item.docid}
                className="card bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="card-body p-6">
                  <h2 className="card-title text-2xl font-bold text-gray-800">{item.title}</h2>
                  <p className="text-gray-700 mt-2">{item.text || "No description available."}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-center text-white text-3xl">No Blogs available...</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
