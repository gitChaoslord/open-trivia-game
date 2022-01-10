import React from 'react';
import { Root } from './components/Root';

const App: React.FC = () => {
  return (
    <div className="font-mono bg-indigo-50 h-screen flex flex-col justify-between overflow-hidden">
      <Root />
    </div>
  );
}
export default App;