import React, { useState } from 'react';


const Login = () => {
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

        <h3 className="text-center fw-bold">Log In</h3>
        <p className="text-muted text-center mb-4">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit}>

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

          <button type="submit" className="btn btn-success w-100 mt-2">Log In</button>
        </form>

        <p className="text-center mt-3 small">
          Already have an account? <a href="/login" className="text-success fw-semibold">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

// const Login = () => {
//     return (
//         <div>
//             <h1>Connectez-vous</h1>
//         </div>
//     )
// }

// export default Login;