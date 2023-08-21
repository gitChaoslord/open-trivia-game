import React from 'react';
import { VERSION } from '../constants/strings';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-500 justify-self-end text-white p-1">
      {VERSION}{import.meta.env.PACKAGE_VERSION}
    </footer>
  )
}
export default Footer;