import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase/configfirebase";
import { onAuthStateChanged } from "firebase/auth";

function Greeting() {
  const [username, setUsername] = useState("");

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning ";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon ";
    } else if (currentHour >= 18 && currentHour < 21) {
      return "Good Evening ";
    } else {
      return "Good Night ";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUsername(user.displayName || user.email || "Guest");
        console.log("Mount");
        
      } else {
        // No user is signed in
        setUsername("Guest");
        console.log("Unmount");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="flex items-center justify-center h-16 mx-auto px-4">
        <h1 className="text-2xl font-bold text-white">
          {getGreeting()}{username} !
        </h1>
      </div>
    </div>
  );
}

export default Greeting;
