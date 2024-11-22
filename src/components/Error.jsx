import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-lg text-gray-700">
          Oops! The page you are looking for doesn't exist.
        </p>
        <p className="text-gray-500">It might have been moved or deleted.</p>
        <Link to="/">
          <button className="btn btn-primary mt-6">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
