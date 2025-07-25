// src/components/Signup.jsx
import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email
      });

      navigate('/locationform');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSignup} className="p-4 shadow rounded bg-white">
          <div className="text-center mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2909/2909782.png" alt="logo" style={{ height: 60 }} />
            <h2 className="fw-bold">Sign Up</h2>
            <p className="text-muted">Enter your credentials to continue</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <p className="text-muted small">By continuing you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          <button className="btn btn-success w-100">Sign Up</button>
          <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
