import React from "react";

/**
 * It sets the accent color to the given color, and then sets the theme color to the accent color
 * @param {string | undefined} color - The color to set the theme to.
 */
export function useThemeColorEffect(color: string | undefined) {
  React.useEffect(() => {
    if (!color) return;
    const originalAccentColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--accent-color");

    const originalAccentTextColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--accent-text-color");

    const originalAccentColorHighlight = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--accent-color-highlight");

    switch (color) {
      case "black":
        document.documentElement.style.setProperty("--accent-text-color", "white");
        document.documentElement.style.setProperty("--accent-color", "black");
        document.documentElement.style.setProperty("--accent-color-highlight", "grey");
        break;
      case "blue":
        document.documentElement.style.setProperty("--accent-color", "#3a86ff");
        document.documentElement.style.setProperty("--accent-color-highlight", "#2366D1");
        break;
      case "brown":
        document.documentElement.style.setProperty("--accent-color", "#a12727");
        document.documentElement.style.setProperty("--accent-color-highlight", "#831313");
        break;
      case "gray":
        document.documentElement.style.setProperty("--accent-color", "#525252");
        document.documentElement.style.setProperty("--accent-color-highlight", "#362d2d");
        break;
      case "green":
        document.documentElement.style.setProperty("--accent-color", "#77c360");
        document.documentElement.style.setProperty("--accent-color-highlight", "#498e35");
        break;
      case "pink":
        document.documentElement.style.setProperty("--accent-color", "#ff8196");
        document.documentElement.style.setProperty("--accent-color-highlight", "#cc4c61");
        break;
      case "purple":
        document.documentElement.style.setProperty("--accent-color", "#800080");
        document.documentElement.style.setProperty("--accent-color-highlight", "#620b62");
        break;
      case "red":
        document.documentElement.style.setProperty("--accent-color", "#f53e2a");
        document.documentElement.style.setProperty("--accent-color-highlight", "#b72a1a");
        break;
      case "white":
        document.documentElement.style.setProperty("--accent-text-color", "black");
        document.documentElement.style.setProperty("--accent-color", "white");
        document.documentElement.style.setProperty("--accent-color-highlight", "grey");
        break;
      case "yellow":
        document.documentElement.style.setProperty("--accent-text-color", "#695f00");
        document.documentElement.style.setProperty("--accent-color", "#fffb10");
        document.documentElement.style.setProperty("--accent-color-highlight", "#d1cc3e");
        break;
    }

    syncThemeColorWithAccentColor();

    return () => {
      document.documentElement.style.setProperty(
        "--accent-text-color",
        originalAccentTextColor
      );
      document.documentElement.style.setProperty("--accent-color", originalAccentColor);
      document.documentElement.style.setProperty(
        "--accent-color-highlight",
        originalAccentColorHighlight
      );

      syncThemeColorWithAccentColor();
    };
  }, [color]);
}

/**
 * It finds the `<meta name="theme-color">` element and sets its `content` attribute to the value of
 * the `--accent-color` CSS variable
 */
function syncThemeColorWithAccentColor() {
  document
    .querySelector("meta[name=theme-color]")
    ?.setAttribute(
      "content",
      getComputedStyle(document.documentElement).getPropertyValue("--accent-color")
    );
}
