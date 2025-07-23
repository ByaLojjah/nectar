import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/signup');
      return;
    }

    const fetchData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setUserData({});
      }
    };

    fetchData();
  }, []);

  if (!userData) return <p>Chargement...</p>;

  return (
    <div className="container mt-4">
      <h2>Profil utilisateur</h2>
      <p><strong>Nom :</strong> {userData.name || 'Non renseigné'}</p>
      <p><strong>Email :</strong> {userData.email || 'Non renseigné'}</p>
      <p><strong>Localisation :</strong> {userData.zone || 'Non renseignée'} - {userData.area || 'Non renseignée'}</p>
      <Link to="/home" className="btn btn-primary mt-3">Retour à l'accueil</Link>
    </div>
  );
}
