import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-400 via-pink-400 to-pink-400 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart size={20} className="fill-white" />
          <p className="text-lg font-semibold">Pink Store Collection</p>
        </div>
        <p className="text-sm text-pink-50 text-center">© 2024 Hijab Berkualitas untuk Muslimah Modern</p>
      </div>
    </footer>
  );
}

export default Footer;
