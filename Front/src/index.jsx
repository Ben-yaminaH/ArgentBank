import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/Header";
import Error404 from "./Error404";
import Footer from "./components/Footer";
import Login from "./Login";
import { Provider } from 'react-redux';
import store from './store/store';
import Profile from './profile';
import PrivateRoute from "./components/PrivateRoute";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />          
      <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>

);
