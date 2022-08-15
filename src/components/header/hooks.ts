import React from "react";

/**
 * It returns a boolean that indicates whether the user has scrolled the page
 * @returns A boolean value that is true if the user has scrolled down the page.
 */
export function useHasScrolled() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useLayoutEffect(() => {
    function onScroll(evt: Event) {
      setScrolled((evt.target as HTMLDivElement).scrollTop > 0);
    }
    document.addEventListener("scroll", onScroll, true);

    return () => {
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  React.useLayoutEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      setScrolled(false);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return scrolled;
}
