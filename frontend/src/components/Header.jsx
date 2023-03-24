import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";




const Header = () => {
  const {
    user, setUser
  } = useContext(GlobalContext)

  const navigate = useNavigate();


  const logout = () => {
    localStorage.setItem("user", null);
    setUser(null)
    navigate('/');
  }


  return (
    <div id="header">
      <div id="header-logo">Movie Tracker</div>
      <nav id="navbar">
        <ul>
          <li>
            <a className="links" href="/movies">Movies</a>
          </li>
          <li>
            <a className="links" href="/top">Top</a>
          </li>
          <li>
            <a onClick={logout} className="links" href="">{user.username} <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header