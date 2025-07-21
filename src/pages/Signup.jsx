import React, { useState, useEffect } from 'react';


const Signup = () => {
  const [section, setSection] = useState('splash');
  const [userData, setUserData] = useState({});
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
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isFirebaseReady]);




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
    window.auth.signOut().then(() => setSection("sign-in"));
  };

  const loadHomeData = (uid) => {
    window.db.collection("users").doc(uid).get().then(doc => {
      if (doc.exists) setUserData(doc.data());
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
      {section === 'splash' && (
        <section className="text-center">
          <img src="image/image_2025-07-01_191749900-removebg-preview.png" alt="" />
          <div className="spinner-border text-primary mt-3" style={{ width: "4rem", height: "4rem" }}></div>
          <p className="mt-3">Chargement...</p>
        </section>
      )}

      {section === 'start' && (
        <section className="text-center">
          <img src="https://previews.123rf.com/images/luckybusiness/luckybusiness1609/luckybusiness160900204/62462188-cheerful-farmer-with-organic-vegetables-in-garden.jpg" alt="Bienvenue" width="100%" />
          <button onClick={() => setSection("sign-in")} className="btn btn-primary btn-lg mt-4">Commencer</button>
        </section>
      )}

      {section === 'sign-in' && (
        <section>
          <h2>Se connecter</h2>
          <form onSubmit={handleSignin}>
            <input type="email" name="email" className="form-control mb-2" placeholder="Email" required />
            <input type="password" name="password" className="form-control mb-2" placeholder="Mot de passe" required />
            <button type="submit" className="btn btn-primary w-100">Connexion</button>
          </form>

        <div className="d-flex flex-column gap-2 mb-3" style={{ maxWidth: '400px', margin: 'auto' }}>
          <button className="btn btn-outline-primary" onClick={handleGoogleSignIn}>
            Connexion avec Google
          </button>
          <button className="btn btn-outline-primary" onClick={handleFacebookSignIn}>
            Connexion avec Facebook
          </button>
        </div>
          <p className="mt-3 text-center">
            <button onClick={() => setSection('sign-up')} className="btn btn-link">Créer un compte</button> |
            <button onClick={() => setSection('forgot')} className="btn btn-link">Mot de passe oublié</button>
          </p>
        </section>
      )}

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

      {section === 'home' && (
        <section>
          <nav className="navbar navbar-expand-lg bg-light mb-3">
            <div className="container-fluid">
              <span className="navbar-brand"><strong>Votre localisation :</strong> {userData.zone} - {userData.area}</span>
              <button onClick={handleLogout} className="btn btn-outline-danger">Déconnexion</button>
            </div>
          </nav>
          <h2>Bienvenue sur votre page d’accueil</h2>
          <p>Ici la liste des produits, promotions, etc.</p>
          <button className="btn btn-secondary mt-3" onClick={() => setSection("profile")}>Voir profil</button>
        </section>
      )}

      {section === 'profile' && (
        <section>
          <h2>Profil utilisateur</h2>
          <p><strong>Nom :</strong> {userData.name}</p>
          <p><strong>Email :</strong> {userData.email}</p>
          <button className="btn btn-secondary" onClick={() => setSection("home")}>Retour accueil</button>
        </section>
      )}

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
