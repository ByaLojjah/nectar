
import React, { useState } from 'react';


function LocationForm() {
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!zone || !area) return alert('Veuillez remplir les deux champs.');

    try {
      await addDoc(collection(db, 'locations'), { zone, area });
      alert('Localisation enregistrée');
      setZone('');
      setArea('');
    } catch (error) {
      console.error("Erreur d'enregistrement :", error);
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
            <option value="Banasree">Banasree</option>
            <option value="Dakar">Dakar</option>
            <option value="Yoff">Yoff</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <select className="form-control" value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Select Area</option>
            <option value="Residential">Residential</option>
            <option value="Business">Business</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success btn-block">Submit</button>
      </form>
    </div>
  );
}

export default LocationForm;