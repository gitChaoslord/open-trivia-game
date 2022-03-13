import React from 'react';
import { version } from '../../package.json';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-500 justify-self-end p-1">
      <p className="text-gray-300">by <a href="https://gitchaoslord.github.io" className="text-white" target="_blank" rel="noreferrer" >John Kotronakis</a> </p>
      <span className="text-sm text-gray-300">Version - {version}</span>
    </footer>
  )
}
export default Footer;