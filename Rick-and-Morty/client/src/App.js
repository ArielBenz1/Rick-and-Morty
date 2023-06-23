import {useState, useEffect} from "react";
import axios from "axios";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeFavorite} from "./redux/actions";
import Detail from "./views/detail/detail";
import About from "./views/about/about";
import Cards from "./components/Cards/Cards.jsx";
import logoRM from "./assets/logorm.png";
import Navbar from "./components/NavBar/Navbar";

import ErrorPage from "./views/error/errorPage";
import LandingPage from "./views/landingPage/landingPage";
import Favorties from "./views/favorites/favorties";

import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login(userData) {
    try {
      const {email, password} = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const {data} = await axios(URL + `?email=${email}&password=${password}`);
      const {access} = data;
      setAccess(data);
      access && navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  async function searchHandler(id) {

    try {
      const response = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );
      const data = response.data;
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("¡No hay personajes con este ID!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function closeHandler(id) {
    let deleted = characters.filter((character) => character.id !== Number(id));

    dispatch(removeFavorite(id));

    setCharacters(deleted);
  }

  function randomHandler() {
    let haveIt = [];
    let random = (Math.random() * 826).toFixed();
    random = Number(random);

    if (!haveIt.includes(random)) {
      haveIt.push(random);
      fetch(`https://rickandmortyapi.com/api/character/${random}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("No hay personajes con ese ID");
          }
        });
    } else {
      console.log("Ya agregaste todos los personajes");
      return false;
    }
  }

  return (
    <div className="App">
      <img className="title" src={logoRM} alt="logo" />

      {location.pathname !== "/" && (
        <Navbar onSearch={searchHandler} random={randomHandler} />
      )}

      <Routes>
        <Route path="/" element={<LandingPage login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorties />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
