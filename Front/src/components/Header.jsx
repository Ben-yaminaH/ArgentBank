import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import Logo from "../assets/img/argentBankLogo.png";
import "../css/main.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";




function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); 

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); 
  };

  return (
    <div className="header">
      <nav className="main-nav">
        <NavLink className="menu" to="/">
          <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>

        <div>
          {user ? (
          
            <div className="user-menu">
              <NavLink className="user-name" to="/profile">
              <FontAwesomeIcon icon={faCircleUser} size="lg" />
              <span> {user.firstName} {user.lastName}</span>
              </NavLink>
              <span onClick={handleLogout} className="logout-button">
              <FontAwesomeIcon icon={faRightFromBracket} size="lg" /> Sign Out
              </span>
            </div>
          ) : (
           
            <NavLink className="sign-in" to="/Login">
              
                <div>
              <FontAwesomeIcon icon={faCircleUser} size="lg" />
              </div>
              <div>
                Sign In
                </div>
                
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
