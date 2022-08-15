import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actions, selectors as pokemonDetailsSelectors } from "../slice";
import { selectors as pokemonPageSelectors } from "../../pokemon-page/slice";

/**
 * It returns an object with the following properties:
 * 
 * - `error`: the error from the last request to the API
 * - `isSpeciesLoading`: whether the species is currently being fetched
 * - `isSpeciesError`: whether the species fetch failed
 * - `pokemonInfo`: the pokemon info from the API
 * - `images`: the images from the pokemon info
 * - `species`: the species from the API
 * 
 * The function also has a side effect: it dispatches an action to fetch the pokemon info when the
 * `pokemonName` changes
 * @param {string | undefined} pokemonName - The name of the pokemon to fetch details for.
 */
export function usePokemonInfo(pokemonName: string | undefined) {
  const dispatch = useAppDispatch();
  const error = useAppSelector(pokemonDetailsSelectors.error);
  const pokemonInfoSelectors = React.useMemo(
    () => pokemonPageSelectors.makeInfoSelectors(),
    []
  );
  const speciesId = useAppSelector((state) =>
    pokemonName ? pokemonInfoSelectors.speciesId(state, pokemonName) : undefined
  );
  const species = useAppSelector((state) =>
    speciesId
      ? pokemonDetailsSelectors.species.selectById(state, speciesId)
      : undefined
  );

  const isSpeciesLoading = useAppSelector(
    pokemonDetailsSelectors.species.isLoading
  );
  const isSpeciesError = useAppSelector(
    pokemonDetailsSelectors.species.isError
  );

  const pokemonInfo = useAppSelector((state) =>
    pokemonName
      ? pokemonInfoSelectors.selectById(state, pokemonName)
      : undefined
  );

  const images =
    pokemonInfo?.data?.sprites &&
    Object.entries(pokemonInfo.data.sprites).filter(
      (e) => typeof e[1] === "string"
    );

  React.useEffect(
    function fetchDetails() {
      if (!pokemonName) return;

      const promise = dispatch(actions.getPokemonDetails({ pokemonName }));

      return () => {
        promise.abort();
      };
    },
    [dispatch, pokemonName]
  );

  return {
    error,
    isSpeciesLoading,
    isSpeciesError,
    pokemonInfo,
    images,
    species,
  };
}
