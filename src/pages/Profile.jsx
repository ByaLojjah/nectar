import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        const locRef = doc(db, 'locations', user.uid);
        const locSnap = await getDoc(locRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          // fallback: utiliser user object directement pour les connexions Google
          setUserData({
            username: user.displayName || '',
            email: user.email || '',
          });
        }

        if (locSnap.exists()) {
          setLocationData(locSnap.data());
        }
      } catch (error) {
        console.error('Erreur récupération des données utilisateur :', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (!userData) return <p className="text-center mt-5">Utilisateur non trouvé.</p>;

  return (
    <div className="container py-5 mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card text-center shadow-sm mb-4">
            <div className="card-body">
              <img
                src={auth.currentUser.photoURL || "https://via.placeholder.com/100"}
                alt="Profil"
                className="rounded-circle mb-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h4 className="card-title">
                {userData.username || auth.currentUser.displayName || 'Nom inconnu'}
              </h4>
              <p className="card-text text-muted">
                {userData.email || auth.currentUser.email}
              </p>
              {locationData ? (
                <>
                  <p className="mb-1"><strong>Zone :</strong> {locationData.zone}</p>
                  <p><strong>Area :</strong> {locationData.area}</p>
                </>
              ) : (
                <p className="text-muted">Localisation non renseignée.</p>
              )}
            </div>
          </div>

          <div className="card shadow-sm">
            <ul className="list-group list-group-flush">
              {[
                'Orders',
                'My Details',
                'Delivery Address',
                'Payment Methods',
                'Promo Code',
                'Notifications',
                'Help',
                'About',
              ].map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {item}
                  <i className="bi bi-chevron-right"></i>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="btn btn-outline-success w-100 mt-4"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
