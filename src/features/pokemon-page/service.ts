import type { EntityState } from "@reduxjs/toolkit";
import type { LoadableResource } from "../../redux/types";
import type { PokemonInfo } from "./types";

/**
 * If the argument has a url property, return the result of getUrlDataByAddress, otherwise return the
 * result of getDefaultUrlData.
 * @param {{ size: number; offset: number } | { url: string }} args - { size: number; offset: number }
 * | { url: string }
 * @returns A function that takes an object with either a size and offset or a url and returns a
 * string.
 */
export function getUrlData(
  args: { size: number; offset: number } | { url: string }
) {
  return "url" in args
    ? getUrlDataByAddress(args.url)
    : getDefaultUrlData(args.offset, args.size);
}

/**
 * It takes a URL string, parses it, and returns an object with the URL, page size, and items offset
 * @param {string} url - The URL of the request.
 * @returns An object with the url, pageSize, and itemsOffset properties.
 */
function getUrlDataByAddress(url: string) {
  const urlObj = new URL(url);
  return {
    url,
    pageSize: parseInt(urlObj.searchParams.get("limit")!, 10),
    itemsOffset: parseInt(urlObj.searchParams.get("offset")!, 10),
  };
}

/**
 * It returns an object with the url, pageSize, and itemsOffset properties
 * @param {number} itemsOffset - The offset of the items to be fetched.
 * @param {number} pageSize - The number of items to be displayed on the page.
 * @returns An object with the url, pageSize, and itemsOffset properties.
 */
function getDefaultUrlData(itemsOffset: number, pageSize: number) {
  return {
    url: `https://pokeapi.co/api/v2/pokemon?offset=${itemsOffset}&limit=151`,
    pageSize,
    itemsOffset,
  };
}

/**
 * It takes the total number of items, the offset of the first item on the current page, and the page
 * size, and returns an object with the total number of pages and the current page number
 * @param {number} totalItems - The total number of items in the collection.
 * @param {number} itemOffset - The index of the first item on the current page.
 * @param {number} pageSize - The number of items to show per page.
 * @returns An object with two properties: pageCount and currentPage.
 */
export function getPaginationInfo(
  totalItems: number,
  itemOffset: number,
  pageSize: number
) {
  const pageCount = Math.ceil(totalItems / pageSize);
  return {
    pageCount,
    currentPage:
      pageCount - Math.ceil((totalItems - itemOffset) / pageSize) + 1,
  };
}

/**
 * It takes a string, and returns a number
 * @param {string} url - The URL of the resource you want to fetch.
 * @returns The id of the pokemon
 */
export function idFromUrl(url: string) {
  return url.match(/(\d+)\/$/)?.[1];
}

/**
 * "Given a state and a pokemon name, return the species url of the pokemon."
 * 
 * The function is a selector because it takes a state and returns a value
 * @param state - EntityState<LoadableResource<PokemonInfo>>
 * @param {string} pokemonName - The name of the pokemon we want to get the species URL for.
 * @returns A selector that returns the species url of a pokemon.
 */
export function speciesUrlSelector(
  state: EntityState<LoadableResource<PokemonInfo>>,
  pokemonName: string
) {
  return state.entities[pokemonName]?.data?.species?.url;
}
