import type { EntityId } from "@reduxjs/toolkit";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectors } from "../slice";

/**
 * UsePokemonInfo is a React hook that returns the info for a given pokemon name.
 * @param {EntityId} pokemonName - EntityId
 * @returns The pokemonInfoSelectors.selectById(state, pokemonName)
 */
export function usePokemonInfo(pokemonName: EntityId) {
  const pokemonInfoSelectors = React.useMemo(
    () => selectors.makeInfoSelectors(),
    []
  );

  return useAppSelector((state) =>
    pokemonInfoSelectors.selectById(state, pokemonName)
  );
}
