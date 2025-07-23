// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return navigate('/');

    const fetchData = async () => {
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="container py-5">
      {userData && (
        <>
          <div className="text-center">
            <h4>{userData.username}</h4>
            <p className="text-muted">{userData.email}</p>
          </div>

          <ul className="list-group mt-4">
            <li className="list-group-item d-flex justify-content-between align-items-center">Orders <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">My Details <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Delivery Address <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Payment Methods <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Promo Cord <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Notifications <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Help <i className="bi bi-chevron-right"></i></li>
            <li className="list-group-item d-flex justify-content-between align-items-center">About <i className="bi bi-chevron-right"></i></li>
          </ul>

          <button className="btn btn-outline-danger w-100 mt-4" onClick={handleLogout}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Profile;
