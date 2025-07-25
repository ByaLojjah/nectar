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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMsg('Utilisateur non trouvé.');
          break;
        case 'auth/wrong-password':
          setErrorMsg('Mot de passe incorrect.');
          break;
        case 'auth/invalid-email':
          setErrorMsg('Email invalide.');
          break;
        default:
          setErrorMsg("Erreur de connexion : " + error.message);
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      setErrorMsg("Erreur Google : " + error.message);
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      setErrorMsg("Erreur Facebook : " + error.message);
    }
    setLoading(false);
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

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <p className="text-muted small">
            By continuing you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
          <button className="btn btn-success w-100" type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Log In'}
          </button>

          <hr />

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-danger w-100 mb-2"
            disabled={loading}
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="btn btn-primary w-100"
            disabled={loading}
          >
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
