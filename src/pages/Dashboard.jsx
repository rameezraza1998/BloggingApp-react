import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../config/firebase/configfirebase.js";
import {
  collection,
  doc,
  addDoc,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";

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
      const newData = querySnapshot.forEach((doc) => {
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

  const publishPost = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "data"), {
        title: titleInput.current.value,
        text: textInput.current.value,
        uid: auth.currentUser.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      data.push({
        title: titleInput.current.value,
        text: textInput.current.value,
        uid: auth.currentUser.uid,
        docid: docRef.id,
      });
      setData([...data]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(data);

    textInput.current.value = "";
    titleInput.current.value = "";
  };

  const deleteData = async (item, index) => {
    await deleteDoc(doc(db, "data", item.docid));
    data.splice(index, 1);
    setData([...data]);
    console.log("data deleted");
  };

  const editData = async (item, index) => {
    const updatedTitle = prompt("Edit your title");
    const updatedText = prompt("Edit your text");
    const washingtonRef = doc(db, "data", item.docid);

    await updateDoc(washingtonRef, {
      title: updatedTitle,
      text: updatedText,
    });
    data[index].title = updatedTitle;
    data[index].text = updatedText;
    setData([...data]);
    console.log("data updated");
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <h1 className="text-center mt-4 text-5xl text-white">Dashboard</h1>
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
            <button className="btn btn-primary w-full mt-2">Publish</button>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center justify-center py-8 bg-base-200">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div key={item.docid} className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>{item.text || "No description available."}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => deleteData(item, index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
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
