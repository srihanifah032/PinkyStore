import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Public/Navbar';
import Footer from '../Public/Footer';

function PublicLayout({ cartCount }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Navbar cartCount={cartCount} />
      <main className="container mx-auto px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;