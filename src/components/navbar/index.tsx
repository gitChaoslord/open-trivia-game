import { GAME_TITLE, PORTFOLIO_LINK } from '@constants/strings';
import { useAppDispatch } from '@store/index';
import React from 'react';
import "./index.css";
import { showSettingsModal } from '@store/features/settings';
import { IoSettingsSharp } from "react-icons/io5"

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleOpenSettingsModal = () => {
    dispatch(showSettingsModal())
  };

  return (
    <header className="navbar">

      <h1 className="nav__title">{GAME_TITLE}</h1>

      <div className="nav__actions">

        <button onClick={handleOpenSettingsModal}>
          <IoSettingsSharp size={20} />
        </button>

        <a href={PORTFOLIO_LINK}
          className="flex"
          aria-label="portfolio-link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="my-auto"
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