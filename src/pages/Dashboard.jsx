import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../config/firebase/configfirebase.js";
import { collection, doc, addDoc, query, setDoc, updateDoc, deleteDoc, where, getDocs } from "firebase/firestore";

function Dashboard() {
  const textInput = useRef();
  const titleInput = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDatafromDB = async () => {
      const q = query(
        collection(db, "data"),
        where("uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
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

  const publishPost = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "data"), {
        title: titleInput.current.value,
        text: textInput.current.value,
        uid: auth.currentUser.uid,
      });
      setData([...data, { title: titleInput.current.value, text: textInput.current.value, uid: auth.currentUser.uid, docid: docRef.id }]);
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
      <h1 className="text-center mt-4 text-5xl text-white">Dashboard</h1>
      <form onSubmit={publishPost}>
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="bg-base-100 shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-center text-white">Share Your Thoughts</h2>
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
            <button className="btn btn-primary w-full mt-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-all">Publish</button>
          </div>
        </div>
      </form>

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
            <div className="card-actions justify-end">
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
    <h1 className="text-center text-white text-3xl">No Blogs available...</h1>
  )}
</div>


    </div>
  );
}

export default Dashboard;
