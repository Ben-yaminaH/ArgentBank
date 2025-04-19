import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile, clearError } from "./slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      console.error("Erreur du serveur :", error);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email || !password) {
      console.log("Champs vides détectés");
      setFormError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setFormError("");
      dispatch(clearError());

      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log("Token reçu :", result.token);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token manquant après connexion.");
      }

      await dispatch(fetchUserProfile());
      navigate("/profile");
    } catch (err) {
      console.error("Erreur de connexion :", err.message || err);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="lg" />
        <h2>Connexion</h2>
        <div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={
                formError && !email
                  ? { border: "2px solid red", backgroundColor: "#fff0f0" }
                  : {}
              }
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={
                formError && !password
                  ? { border: "2px solid red", backgroundColor: "#fff0f0" }
                  : {}
              }
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="button" onClick={handleLogin} className="sign-in-button">
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>

          {/* Erreur de formulaire (champs vides) */}
          {formError && (
            <p className="error-message" style={{ color: "orange", marginTop: "1rem" }}>
              {formError}
            </p>
          )}

          {/* Erreur API/serveur */}
          {error && !formError && (
            <p className="error-message" style={{ color: "red", marginTop: "1rem" }}>
              {typeof error === "string" ? error : error.message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Login;
