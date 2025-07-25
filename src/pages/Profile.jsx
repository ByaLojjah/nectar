import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          // Fallback si pas de données dans Firestore
          setUserData({
            username: user.displayName || null,
            email: user.email,
            photoURL: user.photoURL || null
          });
        }

        const locRef = doc(db, 'locations', user.uid);
        const locSnap = await getDoc(locRef);

        if (locSnap.exists()) {
          setLocationData(locSnap.data());
        } else {
          setLocationData(null);
        }
      } catch (error) {
        console.error("Erreur récupération userData ou locationData:", error);
        setUserData(null);
        setLocationData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (!userData) return <p className="text-center mt-5">Utilisateur non trouvé.</p>;

  return (
    <div className="container py-5 mt-4">
      <div className="text-center">
        {userData.photoURL && (
          <img
            src={userData.photoURL}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        )}

        <h4>{userData.username || auth.currentUser.displayName || 'Nom non disponible'}</h4>
        <p className="text-muted">{userData.email || auth.currentUser.email}</p>
      </div>

      {locationData ? (
        <div className="mb-4 text-center">
          <h5>Localisation</h5>
          <p><strong>Zone :</strong> {locationData.zone}</p>
          <p><strong>Area :</strong> {locationData.area}</p>
        </div>
      ) : (
        <p className="text-center text-muted">Localisation non renseignée.</p>
      )}

      <ul className="list-group mt-4">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Orders <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          My Details <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Delivery Address <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Payment Methods <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Promo Code <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Notifications <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Help <i className="bi bi-chevron-right"></i>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          About <i className="bi bi-chevron-right"></i>
        </li>
      </ul>

      <button className="btn btn-outline-success w-100 mt-4" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
