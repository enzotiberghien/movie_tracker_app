import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from 'axios'


const Register = () => {
  const navigate = useNavigate();

  const {
    setUser
  } = useContext(GlobalContext)

  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);

    console.log(userData)
    if (userData["password"] !== userData["repeat-password"]) {
      window.alert("Registration failed. Passwords not matching.");
      return
    }

    try {
      const response = await axios.post('/api/users', userData)

      if (response.data) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error)
      window.alert("Registration failed. Username of email already taken.");
    }
  }

  return (
    <div id="form" className="row">
      <div id="form-container" className="col">
        <h1>Register</h1>
        <form onSubmit={register} className="col">
          <input type="text" id="username" name="username" placeholder="USERNAME" required autoFocus />
          <input type="text" id="email" name="email" placeholder="EMAIL" required />
          <input type="password" id="password" name="password" placeholder="PASSWORD" required />
          <input type="password" id="repeat-password" name="repeat-password" placeholder="COMFIRM PASSWORD" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register