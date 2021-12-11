import React from 'react';
import { Navbar } from './components/Navbar';
import { Root } from './components/Root';

const App: React.FC = () => {
  return (
    <div className="font-mono bg-indigo-50 min-h-screen">
      <Navbar />
      <Root />
    </div>
  );
}
export default App;