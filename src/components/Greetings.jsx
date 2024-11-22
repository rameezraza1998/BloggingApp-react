import React, { useEffect } from "react";
import { db } from "../config/firebase/configfirebase"; // Adjust this path to your Firebase configuration file
import { addDoc, collection } from "firebase/firestore"; // Firestore imports

function Greeting() {
  const getGreeting = () => {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon!";
    } else if (currentHour >= 18 && currentHour < 21) {
      return "Good Evening!";
    } else {
      return "Good Night!";
    }
  };


  useEffect(() => {
    
  const saveGreetingToFirestore = async () => {
    const greeting = getGreeting();
    const currentTime = new Date().toLocaleTimeString();

    try {
      const docRef = await addDoc(collection(db, "greetings"), {
        greeting: greeting,
        timestamp: currentTime,
      });
      console.log("Greeting saved with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding greeting: ", e);
    }
  };
    saveGreetingToFirestore();
  }, []); // Runs once when the component mounts

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="flex items-center justify-center h-16 mx-auto px-4">
        <h1 className="text-2xl font-bold text-primary">
          {getGreeting()}
        </h1>
      </div>
    </div>
  );
}

export default Greeting;
