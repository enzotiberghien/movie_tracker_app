import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Movies from "./pages/Movies"
import Top from "./pages/Top"
import Welcome from "./pages/Welcome"
import { GlobalProvider } from "./context/GlobalState"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHandsHolding, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt);
library.add(faStar);
library.add(faMagnifyingGlass);
library.add(faHandsHolding);
library.add(faRightFromBracket);


function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/top" element={<Top />}></Route>
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
