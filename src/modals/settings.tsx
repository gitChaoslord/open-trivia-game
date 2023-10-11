import Modal from '@components/modal'
import { themeOptions } from '@constants/settings';
import { MODAL_SETTINGS_THEME, MODAL_SETTINGS_TITLE } from '@constants/strings';
import { ThemeOptions } from '@models/settings';
import { setTheme, hideSettingsModal } from '@store/features/settings';
import { useAppDispatch, useAppSelector } from '@store/index'
import React from 'react';
import classnames from 'classnames';

const SettingsModal: React.FC = () => {
  const activeTheme = useAppSelector((state) => state.settings.theme);
  const isOpen = useAppSelector((state) => state.settings.settingsModalOpen)
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(hideSettingsModal());

  const handleThemeSelect = (theme: ThemeOptions) => dispatch(setTheme(theme))

  // TODO: optimize classes handling
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="modal-title">{MODAL_SETTINGS_TITLE}</h2>
      <div className="modal-body bg-background">
        <h3 className="text-primary mb-3 text-xl">{MODAL_SETTINGS_THEME}</h3>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 place-items-center">
          {Object.values(themeOptions).map((theme) => (
            <div
              role="button"
              key={theme}
              className={classnames("", { "opacity-100": activeTheme === theme, "opacity-80 hover:opacity-100": activeTheme !== theme })}
              title=""
              onClick={() => handleThemeSelect(theme)}
            >
              <img role="presentation"
                width="240"
                height="240"
                alt=""
                className={classnames("border-2 border-dashed rounded-lg ", { "border-primary": activeTheme === theme, "border-transparent": activeTheme !== theme })}
                src={`assets/images/theme/${theme}.svg`}
              />

              <div className={classnames("font-medium text-content-contrast mt-4 first-letter:uppercase text-center", { "text-primary": activeTheme === theme })}>
                {theme}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default SettingsModal;