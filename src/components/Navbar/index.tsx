import React from 'react';
import "./index.css"

export const Navbar: React.FC = () => {
  return (
    <header className="nav-bar">


      <h1 className="app-title">Trivia game</h1>

      <div className="nav-actions">
        <a href="https://gitchaoslord.github.io"
          className="portfolio-link "
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="assets/GitHub-Mark-Light-64px.png"
            alt="Github Developer Portfolio"
            height="32"
            width="32"
          />
        </a>
      </div>

    </header>
  )
}