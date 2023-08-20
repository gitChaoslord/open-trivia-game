import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-500 justify-self-end text-white p-1">
      Version: {import.meta.env.PACKAGE_VERSION}
    </footer>
  )
}
export default Footer;