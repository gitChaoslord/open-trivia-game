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

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="modal-title">{MODAL_SETTINGS_TITLE}</h2>
      <div className="modal-body">
        <h3 className="text-primary mb-3">{MODAL_SETTINGS_THEME}</h3>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {Object.values(themeOptions).map((theme) => (
            <div role="button"
              key={theme}
              className={classnames("first-letter:uppercase text-content-contrast p-4 text-center shadow rounded border", { "border-primary": activeTheme === theme })}
              onClick={() => handleThemeSelect(theme)}
            >
              {theme}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default SettingsModal;