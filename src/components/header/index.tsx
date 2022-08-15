import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Routes } from "react-router-dom";
import PokemonSearch from "../../features/pokemon-names/pokemon-search";
import { useHasScrolled } from "./hooks";
import { pokemonDetailsRoute } from "../../pages/routes";
import "./style.scss";

export default function Header(props: { goBack: () => void }) {
  const scrolled = useHasScrolled();

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__search">
        <Routes>
          <Route
            path={pokemonDetailsRoute.path}
            element={
              <button
                title="Atras"
                className="header__back-button"
                onClick={props.goBack}
              >
                <FontAwesomeIcon icon={faArrowLeft} size="2x" />
              </button>
            }
          />
        </Routes>
        <PokemonSearch />
        <div className="header__title">
          LISTOS PARA EL COMBATE
        </div>
      </div>
    </header>
  );
}
