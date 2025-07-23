// src/pages/Login.jsx
import React, { useState } from 'react';
import { auth } from '../firebase-config';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      alert("Erreur de connexion : " + error.message);
    }
  };

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      alert("Erreur Google : " + error.message);
    }
  };

  // Connexion avec Facebook
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      alert("Erreur Facebook : " + error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleLogin} className="p-4 shadow rounded bg-white">
          <div className="text-center mb-4">
            <img src="/carrot.png" alt="logo" style={{ height: 40 }} />
            <h2 className="fw-bold">Log In</h2>
            <p className="text-muted">Enter your credentials to continue</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <p className="text-muted small">
            By continuing you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
          <button className="btn btn-success w-100" type="submit">Log In</button>

          <hr />

          {/* Boutons connexion Google et Facebook */}
          <button type="button" onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-2">
            Continue with Google
          </button>
          <button type="button" onClick={handleFacebookLogin} className="btn btn-primary w-100">
            Continue with Facebook
          </button>

          <p className="text-center mt-3">
            Don’t have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
