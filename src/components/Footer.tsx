import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-500 justify-self-end p-3">
      <span className="text-white">{new Date().getFullYear()} © wow.</span>
    </footer>
  )
}
export default Footer;