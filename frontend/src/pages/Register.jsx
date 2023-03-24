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

    const response = await axios.post('http://localhost:5000/api/users', userData)

    if (response.data) {
      navigate('/login');
      

    }
  }

  return (
    <div id="form" className="row">
      <div id="form-container" className="col">
        <h1>Register</h1>
        <form onSubmit={register} className="col">
          <input type="text" id="username" name="username" placeholder="USERNAME" required autoFocus />
          <input type="text" id="email" name="email" placeholder="EMAIL" required  />
          <input type="password" id="password" name="password" placeholder="PASSWORD" required />
          <input type="password" id="repeat-password" name="repeat-password" placeholder="COMFIRM PASSWORD" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register