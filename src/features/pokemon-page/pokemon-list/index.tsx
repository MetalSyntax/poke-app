import { Link } from "react-router-dom";
import PokemonCard from "../pokemon-card";
import { useFetchPage, usePageData } from "./hooks";
import { pokemonDetailsRoute } from "../../../pages/routes";
import ErrorMessage from "../../../components/error-message";
import LoadingSpinner from "../../../components/loading-spinner";
import CardLayout from "../card-layout";
// eslint-disable-next-line
// import Pagination from "../pagination";
import Footer from "../footer";

export default function List() {
  // eslint-disable-next-line
  const { fetchNextPage, fetchPrevPage } = useFetchPage();
  // eslint-disable-next-line
  const { isLoading, isError, pokemonInfoIds, currentPage, pageCount } =
    usePageData();
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <ErrorMessage message="Error!" />
      ) : (
        <>     
          <CardLayout>
            {pokemonInfoIds.map((pokemonName) => (
              <Link
                key={pokemonName}
                to={`/${pokemonDetailsRoute.generate(pokemonName)}`}
              >
                <PokemonCard pokemonName={pokemonName} />
              </Link>
            ))}
          </CardLayout>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </>
  );
}
