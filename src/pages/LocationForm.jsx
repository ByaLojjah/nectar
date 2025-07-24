import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

function LocationForm() {
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!zone || !area) {
      alert('Veuillez remplir les deux champs.');
      return;
    }

    const user = auth.currentUser;
    console.log("Utilisateur actuel:", user);
    if (!user) {
      alert("Utilisateur non connecté");
      return;
    }

    try {
      await setDoc(doc(db, 'locations', user.uid), {
        uid: user.uid,
        zone,
        area,
      });
      alert('Localisation enregistrée');
      setZone('');
      setArea('');
      navigate('/home');
    } catch (error) {
      console.error("Erreur d'enregistrement :", error);
      alert("Erreur lors de l'enregistrement de la localisation : " + error.message);
    }
  };

  return (
    <div className="container text-center mt-5">
      <img
        src="https://img.icons8.com/ios-filled/100/000000/marker.png"
        alt="location"
        style={{ width: 100, marginBottom: 20 }}
      />
      <h3 className="mb-3">Select Your Location</h3>
      <p className="text-muted">Switch on your location to stay in tune with what’s happening in your area</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group mb-3">
              <select className="form-control" value={zone} onChange={(e) => setZone(e.target.value)}>
  <option value="">Select Zone</option>
  <option value="Dakar">DAKAR</option>
  <option value="Thies">THIES</option>
  <option value="Saint-Louis">SAINT LOUIS</option>
  <option value="Kaffrine">KAFFRINE</option>
  <option value="Louga">LOUGA</option>
  <option value="Tambacounda">TAMBACOUNDA</option>
  <option value="Kolda">KOLDA</option>
  <option value="Sedhiou">SEDHIOU</option>
  <option value="Ziguinchor">ZINGUINCHOR</option>
  <option value="Diourbel">DIOURBEL</option>
  <option value="Matam">MATAM</option>
  <option value="Kedougou">KEDOUGOU</option>
  <option value="Fatick">FATICK</option>
  <option value="Kaolack">KAOLACK</option>
</select>
        </div>
        <div className="form-group mb-4">
          <select className="form-control" value={area} onChange={(e) => setArea(e.target.value)}>
  <option value="">Select Quartier</option>
  <option value="Plateau">Plateau</option>
  <option value="Medina">Medina</option>
  <option value="Ouakam">Ouakam</option>
  <option value="Pikine">Pikine</option>
  <option value="Keur Massar">Keur Massar</option>
  <option value="Rufisque">Rufisque</option>
  <option value="Tivaouane">Tivaouane</option>
  <option value="Mbour">Mbour</option>
  <option value="Grand Thies">Grand Thies</option>
  <option value="Nguinth">Nguinth</option>
  <option value="Dagana">Dagana</option>
  <option value="Gueth Ndar">Gueth Ndar</option>
  <option value="Pikine-Ndar">Pikine-Ndar</option>
  <option value="Ndiorgnane">Ndiorgnane</option>
  <option value="Foundiougne">Foundiougne</option>
  <option value="Gossas">Gossas</option>
  <option value="Darou Salm">Darou Salm</option>
  <option value="Bignona">Bignona</option>
  <option value="Kanda">Kanda</option>
  <option value="Santhiaba">Santhiaba</option>
  <option value="Lundiane">Lundiane</option>
</select>
        </div>
        <button type="submit" className="btn btn-success btn-block">Submit</button>
      </form>
    </div>
  );
}

export default LocationForm;
