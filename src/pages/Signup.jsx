import React, { useState } from 'react';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [emailValid, setEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const valid = /\S+@\S+\.\S+/.test(value);
      setEmailValid(valid);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // ici tu peux appeler Firebase Auth
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/135/135620.png"
            alt="Logo"
            style={{ height: '40px' }}
          />
        </div>

        <h3 className="text-center fw-bold">Sign Up</h3>
        <p className="text-muted text-center mb-4">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Afsar Hossen Shuvo"
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="email@example.com"
            />
            {emailValid && (
              <span
                className="position-absolute text-success"
                style={{ top: '38px', right: '10px', fontSize: '1.2rem' }}
              >
                ✓
              </span>
            )}
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="********"
            />
            <span
              role="button"
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute text-secondary"
              style={{ top: '38px', right: '10px', cursor: 'pointer' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <p className="small text-muted">
            By continuing you agree to our <a href="#" className="text-success">Terms of Service</a> and <a href="#" className="text-success">Privacy Policy</a>.
          </p>

          <button type="submit" className="btn btn-success w-100 mt-2">Sign Up</button>
        </form>

        <p className="text-center mt-3 small">
          Already have an account? <a href="/login" className="text-success fw-semibold">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../firebase';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';



// const Signup = () => {
//   const [section, setSection] = useState('splash');
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   // const [isFirebaseReady, setIsFirebaseReady] = useState(false);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const checkFirebase = setInterval(() => {
//   //     if (auth && db) {
//   //       setIsFirebaseReady(true);
//   //       clearInterval(checkFirebase);
//   //     }
//   //   }, 1000);
//   //   return () => clearInterval(checkFirebase);
//   // }, []);


//   useEffect(() => {
//   // if (!isFirebaseReady) return;

//   const unsubscribe = auth.onAuthStateChanged(user => {
//     if (user) {
//       navigate('/signup');
//     } else {
//       setSection('start');
//     }
//   });

//   return () => unsubscribe(); // Propre et évite les appels multiples
// }, [navigate]);

//   // useEffect(() => {
//   //   if (!isFirebaseReady) return;

//   //   const timeout = setTimeout(() => {
//   //     auth.onAuthStateChanged(user => {
//   //       if (user) {
//   //         navigate('/home');
//   //       } else {
//   //         setSection('start');
//   //       }
//   //     });
//   //   }, 1000);

//   //   return () => clearTimeout(timeout);
//   // }, [isFirebaseReady, navigate]);

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const name = e.target.name.value.trim();
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value;

//     // setSection('loading');

//     auth.createUserWithEmailAndPassword(email, password)
//       .then(userCred => {
//         return db.collection("users").doc(userCred.user.uid).set({ name, email });
//       })
//       .then(() => setSection("location"))
//       .catch(err => {
//         alert(err.message);
//         setSection("sign-up");
//       });
//   };

//   const handleSignin = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value.trim();
//     const password = e.target.password.value;

//     // setSection('loading');

//     auth.signInWithEmailAndPassword(email, password)
//       .then(() => navigate('/home'))
//       .catch(err => {
//         alert(err.message);
//         setSection('sign-in');
//       });
//   };

//   const handleSendOTP = (e) => {
//     e.preventDefault();
//     const phoneNumber = e.target.phone.value.trim();
//     // setSection('loading');

//     const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//       size: 'invisible',
//       callback: () => { }
//     });

//     auth.signInWithPhoneNumber(phoneNumber, recaptcha)
//       .then(result => {
//         setConfirmationResult(result);
//         setSection('verify-otp');
//       })
//       .catch(err => {
//         alert(err.message);
//         setSection('phone');
//       });
//   };

//   const handleVerifyOTP = (e) => {
//     e.preventDefault();
//     const code = e.target.otp.value.trim();

//     if (!confirmationResult) return;

//     confirmationResult.confirm(code)
//       .then(result => {
//         const user = result.user;
//         return db.collection("users").doc(user.uid).set({
//           phone: user.phoneNumber
//         }, { merge: true });
//       })
//       .then(() => navigate('/home'))
//       .catch(err => {
//         alert("Code incorrect : " + err.message);
//         setSection('verify-otp');
//       });
//   };

//   const handleLocation = (e) => {
//     e.preventDefault();
//     const zone = e.target.zone.value;
//     const area = e.target.area.value;
//     const user = auth.currentUser;

//     if (!user) return;

//     db.collection("users").doc(user.uid).set({ zone, area }, { merge: true })
//       .then(() => navigate('/home'));
//   };

//   const handleGoogleSignIn = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider)
//       .then(result => {
//         const user = result.user;
//         return db.collection("users").doc(user.uid).set({
//           name: user.displayName,
//           email: user.email
//         }, { merge: true });
//       })
//       .then(() => navigate('/home'))
//       .catch(error => {
//         alert("Erreur Google : " + error.message);
//       });
//   };

//   const handleFacebookSignIn = () => {
//     const provider = new window.firebase.auth.FacebookAuthProvider();
//     auth.signInWithPopup(provider)
//       .then(result => {
//         const user = result.user;
//         return window.db.collection("users").doc(user.uid).set({
//           name: user.displayName,
//           email: user.email
//         }, { merge: true });
//       })
//       .then(() => navigate('/home'))
//       .catch(error => {
//         alert("Erreur Facebook : " + error.message);
//       });
//   };

//   return (
//     <div className="container mt-5">
//       {/* Splash */}
//       {section === 'splash' && (
//         <section className="text-center">
//           <img src="image/image_2025-07-01_191749900-removebg-preview.png" alt="" />
//           <div className="spinner-border text-primary mt-3" style={{ width: "4rem", height: "4rem" }}></div>
//           <p className="mt-3">Chargement...</p>
//         </section>
//       )}

//       {/* Start */}
//       {section === 'start' && (
//         <section className="text-center">
//           <img src="https://previews.123rf.com/images/luckybusiness/luckybusiness1609/luckybusiness160900204/62462188-cheerful-farmer-with-organic-vegetables-in-garden.jpg" alt="Bienvenue" width="100%" />
//           <button onClick={() => setSection("sign-in")} className="btn btn-primary btn-lg mt-4">Commencer</button>
//         </section>
//       )}

//       {/* Sign In */}
//       {section === 'sign-in' && (
//         <section>
//           <h2>Se connecter</h2>
//           <form onSubmit={handleSignin}>
//             <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
//             <input type="password" name="password" className="form-control mb-2" placeholder="Mot de passe" required />
//             <button type="submit" className="btn btn-primary w-100">Connexion</button>
//           </form>

//           <div className="d-flex flex-column gap-2 my-3">
//             <button className="btn btn-outline-primary" onClick={handleGoogleSignIn}>Connexion avec Google</button>
//             <button className="btn btn-outline-primary" onClick={handleFacebookSignIn}>Connexion avec Facebook</button>
//           </div>

//           <p className="text-center">
//             <button onClick={() => setSection('sign-up')} className="btn btn-link">Créer un compte</button> |
//             <button onClick={() => setSection('forgot')} className="btn btn-link">Mot de passe oublié</button>
//           </p>
//           <p className="text-center">
//             <button onClick={() => setSection('phone')} className="btn btn-link">Connexion par téléphone</button>
//           </p>
//         </section>
//       )}

//       {/* Sign Up */}
//       {section === 'sign-up' && (
//         <section>
//           <h2>Créer un compte</h2>
//           <form onSubmit={handleSignup}>
//             <input type="text" name="name" className="form-control mb-2" placeholder="Nom complet" required />
//             <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
//             <input type="password" name="password" className="form-control mb-2" placeholder="Mot de passe" required />
//             <button type="submit" className="btn btn-primary w-100">S’inscrire</button>
//           </form>
//         </section>
//       )}

//       {/* Forgot Password */}
//       {section === 'forgot' && (
//         <section>
//           <h2>Mot de passe oublié</h2>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const email = e.target.email.value;
//             window.auth.sendPasswordResetEmail(email)
//               .then(() => {
//                 alert("Lien de réinitialisation envoyé.");
//                 setSection('sign-in');
//               })
//               .catch(err => alert(err.message));
//           }}>
//             <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
//             <button type="submit" className="btn btn-primary w-100">Envoyer le lien</button>
//           </form>
//         </section>
//       )}

//       {/* Phone Login */}
//       {section === 'phone' && (
//         <section className="text-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/2909/2909764.png"
//             alt="groceries"
//             className="img-fluid mb-4"
//             style={{ maxHeight: "200px" }}
//           />

//           <form onSubmit={handleSendOTP} className="mb-3">
//             <div className="input-group mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
//               <span className="input-group-text bg-white">🇸🇳 +221</span>
//               <input
//                 type="tel"
//                 name="phone"
//                 className="form-control"
//                 placeholder="Numéro de téléphone"
//                 required
//               />
//             </div>
//             <div id="recaptcha-container" className="mb-3"></div>
//             <button type="submit" className="btn btn-primary w-100" style={{ maxWidth: '300px', margin: '0 auto' }}>
//               Continuer
//             </button>
//           </form>
//         </section>
//       )}

//       {/* Verify OTP */}
//       {section === 'verify-otp' && (
//         <section>
//           <h2>Vérification du code</h2>
//           <form onSubmit={handleVerifyOTP}>
//             <input type="text" name="otp" className="form-control mb-2" placeholder="Code reçu par SMS" required />
//             <button type="submit" className="btn btn-success w-100">Vérifier</button>
//           </form>
//         </section>
//       )}

//       {/* Location */}
//       {section === 'location' && (
//         <section>
//           <h2>Votre localisation</h2>
//           <form onSubmit={handleLocation}>
//             <select name="zone" className="form-select mb-2" required>
//               <option value="">Choisissez votre zone</option>
//               <option value="Banassree">Banassree</option>
//               <option value="Dakar Plateau">Dakar Plateau</option>
//               <option value="Yoff">Yoff</option>
//               <option value="Pikine">Pikine</option>
//             </select>
//             <select name="area" className="form-select mb-2" required>
//               <option value="">Choisissez votre quartier</option>
//               <option value="Résidentiel">Résidentiel</option>
//               <option value="Commercial">Commercial</option>
//               <option value="Mixte">Mixte</option>
//             </select>
//             <button type="submit" className="btn btn-primary w-100">Soumettre</button>
//           </form>
//         </section>
//       )}

//       {/* Loading */}
//       {section === 'loading' && (
//         <section className="text-center">
//           <div className="spinner-border text-success" style={{ width: "3rem", height: "3rem" }}></div>
//           <p className="mt-3">Chargement...</p>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Signup;
