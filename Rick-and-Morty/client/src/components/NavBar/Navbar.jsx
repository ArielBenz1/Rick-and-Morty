import SearchBar from "../SearchBar/SearchBar";
import {Link} from "react-router-dom";
import style from "./navbar.module.css";

export default function Navbar({onSearch, random}) {
  return (
    <div className={style.navContainer}>
      <div>
        <Link to="/about">About</Link>
        <Link to="/home">Home</Link>
        <Link to="/favorites">Favs</Link>
      </div>

      <SearchBar onSearch={onSearch} />

      <button className={style.random} onClick={random}>
        ADD RANDOM
      </button>
    </div>
  );
}
