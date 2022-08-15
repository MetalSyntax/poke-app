import React from "react";
import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <a
        className="footer__info"
        href="https://linktr.ee/MetalSyntax"
        target="_blank"
        rel="noopener noreferrer"
      >
        Desarrollado por  <span className="footer__name"> Wonder Diaz</span>
      </a>
    </footer>
  );
}
