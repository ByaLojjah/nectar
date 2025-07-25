import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationForm = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Stocker la localisation dans localStorage ou contexte global
    localStorage.setItem('userLocation', location);

    // Redirection vers la page d'accueil ou une autre page
    navigate('/home');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quelle est votre localisation ?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Votre ville ou quartier</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex : Dakar, Pikine, etc."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Continuer</button>
      </form>
    </div>
  );
};

export default LocationForm;
