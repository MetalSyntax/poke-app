import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectors, actions } from "../slice";

/**
 * It fetches the first page of pokemon when the current page is 1, and it fetches the previous or next
 * page when the user clicks the corresponding button
 * @returns An object with two functions.
 */
export function useFetchPage() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectors.list.currentPage);
  const prevPage = useAppSelector(selectors.list.prevPage);
  const nextPage = useAppSelector(selectors.list.nextPage);
  const lastPromise =
    React.useRef<{
      abort: () => void;
    }>();

  React.useEffect(
    function fetchFirstPage() {
      if (currentPage > 1) return;
      const promise = dispatch(actions.getPokemonPage({ size: 10, offset: 0 }));

      return () => {
        promise.abort();
      };
    },
    [currentPage, dispatch]
  );

  const fetchPrevPage = React.useCallback(() => {
    if (!prevPage) return;
    lastPromise.current?.abort();
    lastPromise.current = dispatch(
      actions.getPokemonPage({
        url: prevPage,
      })
    );
  }, [dispatch, prevPage]);

  const fetchNextPage = React.useCallback(() => {
    if (!nextPage) return;
    lastPromise.current?.abort();
    lastPromise.current = dispatch(
      actions.getPokemonPage({
        url: nextPage,
      })
    );
  }, [dispatch, nextPage]);

  return {
    fetchPrevPage,
    fetchNextPage,
  };
}

/**
 * It returns an object with the following properties:
 * 
 * isLoading: boolean
 * isError: boolean
 * pokemonInfoIds: string[]
 * currentPage: number
 * pageCount: number
 */
export function usePageData() {
  const isLoading = useAppSelector(selectors.list.isLoading);
  const isError = useAppSelector(selectors.list.isError);
  const currentPage = useAppSelector(selectors.list.currentPage);
  const pageCount = useAppSelector(selectors.list.pageCount);
  const pokemonInfoSelectors = React.useMemo(
    () => selectors.makeInfoSelectors(),
    []
  );
  const pokemonInfoIds = useAppSelector(pokemonInfoSelectors.selectIds);

  return { isLoading, isError, pokemonInfoIds, currentPage, pageCount };
}
