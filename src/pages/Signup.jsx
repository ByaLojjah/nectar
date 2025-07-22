import React, { useState, useEffect } from 'react';
const Signup = () => {
  const [section, setSection] = useState('splash');
  const [userData, setUserData] = useState({});
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    const checkFirebase = setInterval(() => {
      if (window.auth && window.db) {
        setIsFirebaseReady(true);
        clearInterval(checkFirebase);
      }
    }, 100);
    return () => clearInterval(checkFirebase);
  }, []);

  useEffect(() => {
    if (!isFirebaseReady) return;

    const timeout = setTimeout(() => {
      window.auth.onAuthStateChanged(user => {
        if (user) {
          loadHomeData(user.uid);
          setSection('home');
        } else {
          setSection('start');
        }
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isFirebaseReady]);

  const loadHomeData = (uid) => {
    window.db.collection("users").doc(uid).get().then(doc => {
      if (doc.exists) setUserData(doc.data());
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setSection('loading');

    window.auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        return window.db.collection("users").doc(userCred.user.uid).set({ name, email });
      })
      .then(() => setSection("location"))
      .catch(err => {
        alert(err.message);
        setSection("sign-up");
      });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setSection('loading');

    window.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        loadHomeData(window.auth.currentUser.uid);
        setSection('home');
      })
      .catch(err => {
        alert(err.message);
        setSection('sign-in');
      });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    const phoneNumber = e.target.phone.value.trim();
    setSection('loading');

    const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => { }
    });

    window.auth.signInWithPhoneNumber(phoneNumber, recaptcha)
      .then(result => {
        setConfirmationResult(result);
        setSection('verify-otp');
      })
      .catch(err => {
        alert(err.message);
        setSection('phone');
      });
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const code = e.target.otp.value.trim();

    if (!confirmationResult) return;

    confirmationResult.confirm(code)
      .then(result => {
        const user = result.user;
        return window.db.collection("users").doc(user.uid).set({
          phone: user.phoneNumber
        }, { merge: true });
      })
      .then(() => {
        loadHomeData(window.auth.currentUser.uid);
        setSection('home');
      })
      .catch(err => {
        alert("Code incorrect : " + err.message);
        setSection('verify-otp');
      });
  };

  const handleLocation = (e) => {
    e.preventDefault();
    const zone = e.target.zone.value;
    const area = e.target.area.value;
    const user = window.auth.currentUser;

    if (!user) return;

    window.db.collection("users").doc(user.uid).set({ zone, area }, { merge: true })
      .then(() => {
        loadHomeData(user.uid);
        setSection('home');
      });
  };

  const handleLogout = () => {
    window.auth.signOut().then(() => {
      setUserData({});
      setSection('sign-in');
    });
  };

  const handleGoogleSignIn = () => {
    const provider = new window.firebase.auth.GoogleAuthProvider();
    window.auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        return window.db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email
        }, { merge: true });
      })
      .then(() => {
        loadHomeData(window.auth.currentUser.uid);
        setSection("home");
      })
      .catch(error => {
        alert("Erreur Google : " + error.message);
      });
  };

  const handleFacebookSignIn = () => {
    const provider = new window.firebase.auth.FacebookAuthProvider();
    window.auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        return window.db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email
        }, { merge: true });
      })
      .then(() => {
        loadHomeData(window.auth.currentUser.uid);
        setSection("home");
      })
      .catch(error => {
        alert("Erreur Facebook : " + error.message);
      });
  };

  return (
    <div className="container mt-5">
      {/* Splash */}
      {section === 'splash' && (
        <section className="text-center">
          <img src="image/image_2025-07-01_191749900-removebg-preview.png" alt="" />
          <div className="spinner-border text-primary mt-3" style={{ width: "4rem", height: "4rem" }}></div>
          <p className="mt-3">Chargement...</p>
        </section>
      )}

      {/* Start */}
      {section === 'start' && (
        <section className="text-center">
          <img src="https://previews.123rf.com/images/luckybusiness/luckybusiness1609/luckybusiness160900204/62462188-cheerful-farmer-with-organic-vegetables-in-garden.jpg" alt="Bienvenue" width="100%" />
          <button onClick={() => setSection("sign-in")} className="btn btn-primary btn-lg mt-4">Commencer</button>
        </section>
      )}

      {/* Sign In */}
      {section === 'sign-in' && (
        <section>
          <h2>Se connecter</h2>
          <form onSubmit={handleSignin}>
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
            <input type="password" name="password" className="form-control mb-2" placeholder="Mot de passe" required />
            <button type="submit" className="btn btn-primary w-100">Connexion</button>
          </form>

          <div className="d-flex flex-column gap-2 my-3">
            <button className="btn btn-outline-primary" onClick={handleGoogleSignIn}>Connexion avec Google</button>
            <button className="btn btn-outline-primary" onClick={handleFacebookSignIn}>Connexion avec Facebook</button>
          </div>

          <p className="text-center">
            <button onClick={() => setSection('sign-up')} className="btn btn-link">Créer un compte</button> |
            <button onClick={() => setSection('forgot')} className="btn btn-link">Mot de passe oublié</button>
          </p>
          <p className="text-center">
            <button onClick={() => setSection('phone')} className="btn btn-link">Connexion par téléphone</button>
          </p>
        </section>
      )}

      {/* Sign Up */}
      {section === 'sign-up' && (
        <section>
          <h2>Créer un compte</h2>
          <form onSubmit={handleSignup}>
            <input type="text" name="name" className="form-control mb-2" placeholder="Nom complet" required />
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
            <input type="password" name="password" className="form-control mb-2" placeholder="Mot de passe" required />
            <button type="submit" className="btn btn-primary w-100">S’inscrire</button>
          </form>
        </section>
      )}

      {/* Forgot Password */}
      {section === 'forgot' && (
        <section>
          <h2>Mot de passe oublié</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            window.auth.sendPasswordResetEmail(email)
              .then(() => {
                alert("Lien de réinitialisation envoyé.");
                setSection('sign-in');
              })
              .catch(err => alert(err.message));
          }}>
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
            <button type="submit" className="btn btn-primary w-100">Envoyer le lien</button>
          </form>
        </section>
      )}

      {/* Phone Login */}

      {section === 'phone' && (
        <section className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2909/2909764.png"
            alt="groceries"
            className="img-fluid mb-4"
            style={{ maxHeight: "200px" }}
          />

          <form onSubmit={handleSendOTP} className="mb-3">
            <div className="input-group mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
              <span className="input-group-text bg-white">🇸🇳 +221</span>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Numéro de téléphone"
                required
              />
            </div>
            <div id="recaptcha-container" className="mb-3"></div>
            <button type="submit" className="btn btn-primary w-100" style={{ maxWidth: '300px', margin: '0 auto' }}>
              Continuer
            </button>
          </form>

          <p className="text-muted my-2">Ou connectez-vous avec un réseau social</p>

          <div className="d-flex flex-column gap-2" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <button className="btn btn-outline-primary" onClick={handleGoogleSignIn}>
              <i className="fab fa-google me-2"></i> Continue with Google
            </button>
            <button className="btn btn-outline-primary" onClick={handleFacebookSignIn}>
              <i className="fab fa-facebook-f me-2"></i> Continue with Facebook
            </button>
          </div>
        </section>
      )}


      {/* Verify OTP */}
      {section === 'verify-otp' && (
        <section>
          <h2>Vérification du code</h2>
          <form onSubmit={handleVerifyOTP}>
            <input type="text" name="otp" className="form-control mb-2" placeholder="Code reçu par SMS" required />
            <button type="submit" className="btn btn-success w-100">Vérifier</button>
          </form>
        </section>
      )}

      {/* Location */}
      {section === 'location' && (
        <section>
          <h2>Votre localisation</h2>
          <form onSubmit={handleLocation}>
            <select name="zone" className="form-select mb-2" required>
              <option value="">Choisissez votre zone</option>
              <option value="Banassree">Banassree</option>
              <option value="Dakar Plateau">Dakar Plateau</option>
              <option value="Yoff">Yoff</option>
              <option value="Pikine">Pikine</option>
            </select>
            <select name="area" className="form-select mb-2" required>
              <option value="">Choisissez votre quartier</option>
              <option value="Résidentiel">Résidentiel</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixte">Mixte</option>
            </select>
            <button type="submit" className="btn btn-primary w-100">Soumettre</button>
          </form>
        </section>
      )}

      {/* Home */}
      {section === 'home' && (
        <section>
          <div className="mb-3 text-end">
            <p><strong>Votre localisation :</strong> {userData.zone} - {userData.area}</p>
            <button onClick={handleLogout} className="btn btn-outline-danger">Déconnexion</button>
          </div>
          <h2>Bienvenue sur votre page d’accueil</h2>
          <p>Ici la liste des produits, promotions, etc.</p>
          <button className="btn btn-secondary mt-3" onClick={() => setSection("profile")}>Voir profil</button>
        </section>
      )}

      {/* Profile */}
      {section === 'profile' && (
        <section>
          <h2>Profil utilisateur</h2>
          <p><strong>Nom :</strong> {userData.name}</p>
          <p><strong>Email :</strong> {userData.email}</p>
          <button className="btn btn-secondary" onClick={() => setSection("home")}>Retour accueil</button>
        </section>
      )}

      {/* Loading */}
      {section === 'loading' && (
        <section className="text-center">
          <div className="spinner-border text-success" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="mt-3">Chargement...</p>
        </section>
      )}
    </div>
  );
};

export default Signup;
