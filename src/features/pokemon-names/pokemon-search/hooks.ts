import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pokemonDetailsRoute } from "../../../pages/routes";
import { useAppSelector } from "../../../redux/hooks";
import { actions } from "../slice";

/**
 * When the component mounts, dispatch an action to update the suggestions.
 */
export function useInitialFilterSuggestionsEffect() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.updateSuggestions());
  }, [dispatch]);
}

/**
 * It returns a callback that dispatches an action to update the suggestions
 * @returns A function that takes a string as a parameter and dispatches an action to update the
 * suggestions.
 */
export function useUpdateSuggestionsCallback() {
  const dispatch = useDispatch();

  return React.useCallback(
    (filterParam: string) => {
      dispatch(actions.updateSuggestions(filterParam));
    },
    [dispatch]
  );
}

/**
 * It returns a function that navigates to the details page of the first pokemon in the filtered list
 * @returns A function that navigates to the pokemon details page if the name is not empty.
 */
export function useChangeRouteCallback() {
  const navigate = useNavigate();
  const filterState = useAppSelector((state) => state.filteredPokemonNames);

  return () => {
    if (filterState.name.trim().length > 0)
      navigate(pokemonDetailsRoute.generate(filterState.name));
  };
}

/**
 * It returns the filteredPokemonNames property from the state object
 * @returns The filteredPokemonNames array from the state.
 */
export function useFilterState() {
  return useAppSelector((state) => state.filteredPokemonNames);
}
