import { useState } from 'react';
import './Auth.css'; 
import axios from 'axios';
import BgImage from "./../../assets/images/ig.png";
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { useAuth } from '../../Context/AuthContext'; // 2. Import Auth Context

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate(); // 3. Initialize navigation
  const { login } = useAuth();    // 4. Get login function from context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, general: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!isLogin && formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await axios.post(
          "https://e-commerce-backend-node-js-eyecore.vercel.app/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true } // ✅ IMPORTANT (session)
        );

        if (res.status === 200) {
          alert("Login successful ✅");
          
          // 5. UPDATE GLOBAL STATE & REDIRECT
          login(); 
          navigate('/'); // Redirect to Home
        }

      } else {
        // 📝 REGISTER
        await axios.post("https://e-commerce-backend-node-js-eyecore.vercel.app/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        alert("Account created successfully 🎉 Please login");
        setIsLogin(true); // Switch to login view
      }

      // Clear form only on success (or partial success like register)
      setFormData({ name: "", email: "", password: "" });
      setErrors({});

    } catch (error) {
      console.error(error);
      setErrors({
        general: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="auth-page-root">
      <div className="auth-container">

        {/* LEFT */}
        <div className="auth-left">
         
          <div className="form-wrapper">
             <div className="nav-header">
            <button className="round-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
              &#8592;
            </button>
          </div>
            <h1>{isLogin ? "Welcome Back" : "Join Eyecore"}</h1>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <small className="error-text">{errors.name}</small>
                  )}
                </div>
              )}

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="error-text">{errors.email}</small>
                )}
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="error-text">{errors.password}</small>
                )}
              </div>

              {errors.general && (
                <small className="error-text general-error">{errors.general}</small>
              )}     
              
              <button type="submit" className="btn-primary">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="toggle-text">
              {isLogin ? "New to Eyecore?" : "Already a member?"}
              <span onClick={() => {
                setIsLogin(!isLogin);
                setErrors({}); // Clear errors when switching modes
              }}>
                {isLogin ? " Create an account" : " Sign in"}
              </span>
            </div>
            
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="bg-layer">
            <img src={BgImage} alt="Background" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;