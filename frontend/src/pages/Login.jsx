import Button from "../components/Button"
import axios from 'axios'
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


const Login = () => {
  const navigate = useNavigate();

  const {
    setUser, setWatched
  } = useContext(GlobalContext)

  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);

    try {
      const response = await axios.post('/api/users/login', userData)

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data)
      setWatched([])
      navigate('/movies');
    } catch (error) {
      window.alert("Login failed. Please check your credentials and try again.");
    }
  }


  useEffect(() => {
    // Automaticaly logout any logged user when accessing the login page
    localStorage.setItem("user", null);
    setUser(null)
  }, [])

  return (
    <div id="form" className="row">
      <div id="form-container" className="col">
        <h1>Login</h1>
        <form onSubmit={login} className="col">
          <input type="text" id="email" name="email" placeholder="EMAIL" required autoFocus />
          <input type="password" id="password" name="password" placeholder="PASSWORD" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
