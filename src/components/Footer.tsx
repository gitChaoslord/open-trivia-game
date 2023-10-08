import React from 'react';
import { VERSION } from '@constants/strings';

const Footer: React.FC = () => {
  return (
    <footer>
      {VERSION}{import.meta.env.PACKAGE_VERSION}
    </footer>
  )
}
export default Footer;