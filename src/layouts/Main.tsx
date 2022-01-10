import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Navbar } from '../components/Navbar';

const MainLayout: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  )
}
export default MainLayout;