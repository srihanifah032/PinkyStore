import Navbar from '../Public/Navbar';
import Footer from '../Public/Footer';

function PublicLayout({ children, cartCount, onNavigate, currentPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Navbar cartCount={cartCount} onNavigate={onNavigate} currentPage={currentPage} />
      <main className="container mx-auto px-4 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;