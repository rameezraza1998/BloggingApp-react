import React, { useState, useEffect } from 'react'
import { auth, db } from "../config/firebase/configfirebase.js";
import { collection, getDocs } from "firebase/firestore";


function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDatafromDB = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push({
          ...doc.data(),
          docid: doc.id,
        });
        setData([...data]);
        console.log("data coming from DB");
      });
    };
  
    getDatafromDB();
  }, []); 
  


  return (
    <div className="bg-base-200 text-base-content min-h-screen"> {/* Added background color and text classes */}
      <h1 className="text-center text-5xl text-white">Home</h1>
      
      <div className="flex flex-col items-center justify-center py-8">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div key={item.docid} className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>{item.text || "No description available."}</p>
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

export default Home;
