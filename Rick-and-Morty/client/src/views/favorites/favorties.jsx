import Cards from "../../components/Cards/Cards";
import {useSelector, useDispatch} from "react-redux";
import {
  orderFavorites,
  filterFavorites,
  resetFavorites,
} from "../../redux/actions";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.myFavorites);

  function handleSort(e) {
    dispatch(orderFavorites(e.target.value));
  }

  function handleFilter(e) {
    dispatch(filterFavorites(e.target.value));
  }

  function handleReset() {
    dispatch(resetFavorites());
  }

  return (
    <div>
      <select placeholder="Gender" onChange={handleFilter}>
        {["Male", "Female", "unknown", "Genderless"].map((gender) => (
          <option value={gender}>{gender}</option>
        ))}
      </select>
      <select placeholder="Orden" onChange={handleSort}>
        {["Ascendente", "Descendente"].map((order) => (
          <option value={order}>{order}</option>
        ))}
      </select>
      <button onClick={handleReset}>Reset Filters</button>
      <Cards characters={favorites} />
    </div>
  );
}