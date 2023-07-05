import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-500 justify-self-end p-1">
      <p className="text-gray-300">Version: {import.meta.env.PACKAGE_VERSION} - <a href="https://gitchaoslord.github.io" className="text-white" target="_blank" rel="noreferrer" >Dev Profile</a> </p>
    </footer>
  )
}
export default Footer;