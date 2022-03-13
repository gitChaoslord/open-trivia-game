import React from 'react';
import MainLayout from './layouts/Main';

const App: React.FC = () => {
  return (
    <div className="font-mono bg-indigo-50 h-screen flex flex-col justify-between overflow-hidden">
      <MainLayout />
    </div>
  );
}
export default App;