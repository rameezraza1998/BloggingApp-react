import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../config/firebase/configfirebase.js";
import {
  collection,
  doc,
  addDoc,
  query,
  setDoc,
  updateDoc,
  orderBy,
  deleteDoc,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import profileImage from "../assets/profile.png";

function Dashboard() {
  const textInput = useRef();
  const titleInput = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDatafromDB = async () => {
      const q = query(
        collection(db, "data"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("timeStamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data()); 
        newData.push({
          ...doc.data(),
          docid: doc.id,
        });
      });
      setData(newData);
    };
    getDatafromDB();
  }, []);

  const publishPost = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "data"), {
        title: titleInput.current.value,
        text: textInput.current.value,
        uid: auth.currentUser.uid,
        timeStamp: Timestamp.fromDate(new Date()), // Current timestamp
        name: auth.currentUser.displayName,
      });
      setData([
        ...data,
        {
          title: titleInput.current.value,
          text: textInput.current.value,
          uid: auth.currentUser.uid,
          docid: docRef.id,
          name: auth.currentUser.displayName,
        },
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    textInput.current.value = "";
    titleInput.current.value = "";
  };

  const deleteData = async (item, index) => {
    await deleteDoc(doc(db, "data", item.docid));
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const editData = async (item, index) => {
    const updatedTitle = prompt("Edit your title");
    const updatedText = prompt("Edit your text");
    const washingtonRef = doc(db, "data", item.docid);
    await updateDoc(washingtonRef, {
      title: updatedTitle,
      text: updatedText,
    });
    const updatedData = [...data];
    updatedData[index].title = updatedTitle;
    updatedData[index].text = updatedText;
    setData(updatedData);
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-indigo-500 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center mt-4 text-5xl text-black">Dashboard</h1>
      <form onSubmit={publishPost}>
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="bg-base-100 shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-center text-white">
              Share Your Thoughts
            </h2>
            <input
              type="text"
              ref={titleInput}
              placeholder="Enter a title..."
              className="input input-bordered w-full rounded-md shadow-sm mb-4 focus:outline-none focus:ring focus:ring-base-300"
            />
            <textarea
              placeholder="What's on your mind?"
              ref={textInput}
              className="textarea textarea-bordered w-full rounded-md shadow-sm h-32 resize-none focus:outline-none focus:ring focus:ring-base-300"
            ></textarea>
            <button className="btn btn-primary w-full mt-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
              Publish
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center justify-center py-8 w-full max-w-7xl">
        {data.length > 0 ? (
         <div className="grid grid-cols-1 gap-6 w-full">
         {data.map((item, index) => (
           <div
             key={item.docid}
             className="card bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl shadow-lg hover:shadow-2xl transition-all w-full"
           >
             <div className="card-body p-6">
               <div className="flex items-center mb-4">
                 <img
                   src={profileImage} // Fallback to placeholder
                   alt={`${item.name}'s profile`}
                   className="w-12 h-12 rounded-md border-2 border-gray-300"
                 />
                 <div className="ml-4">
                   <h3 className="text-lg font-bold text-gray-800">
                     {item.name || "Unknown"}
                   </h3>
                   <p className="text-gray-500 text-sm">
                     {item.timeStamp
                       ? new Date(item.timeStamp.seconds * 1000).toLocaleString()
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
               <div className="card-actions justify-end mt-4">
                 <button
                   className="btn btn-primary bg-indigo-600 text-white hover:bg-indigo-700"
                   onClick={() => deleteData(item, index)}
                 >
                   Delete
                 </button>
                 <button
                   className="btn btn-primary bg-indigo-600 text-white hover:bg-indigo-700"
                   onClick={() => editData(item, index)}
                 >
                   Edit
                 </button>
               </div>
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

export default Dashboard;
