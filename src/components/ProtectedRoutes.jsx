import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase/configfirebase.js';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ component }) => {
    const navigate = useNavigate()
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // console.log(uid)
                setLoading(false)
            } else {
                navigate('/login')
            }
        });

    }, [])

    // use navigate
    return (
        loading ? (
          <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
              <h1 className="text-xl font-semibold text-white">Loading...</h1>
            </div>
          </div>
        ) : (
          component
        )
      );
      
}

export default ProtectedRoutes;
