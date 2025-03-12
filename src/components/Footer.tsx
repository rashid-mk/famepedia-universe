
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Instagram, Youtube, Github, Heart, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would send the email to your backend
    setIsSubmitted(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-famepedia-dark-gray text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <a href="/" className="text-2xl font-bold tracking-tight inline-block mb-6">
              <span className="text-gradient">Fame</span>
              <span className="text-white">pedia</span>
            </a>
            <p className="text-gray-400 mb-6">
              Exploring the digital influence and cultural impact of the world's most famous personalities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#people" className="text-gray-400 hover:text-white transition-colors">Top People</a>
              </li>
              <li>
                <a href="#categories" className="text-gray-400 hover:text-white transition-colors">Categories</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Entertainment</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Sports</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Business</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Politics</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Technology</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to get the latest updates on the world's most famous people.
            </p>
            {isSubmitted ? (
              <div className="bg-green-900/30 border border-green-800 rounded-lg p-4 text-green-400">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white/10 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-famepedia-blue focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 px-3 py-2 bg-famepedia-blue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Famepedia. All rights reserved.
          </p>
          <div className="flex items-center">
            <p className="text-gray-400 mr-2">Made with</p>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <button
              onClick={scrollToTop}
              className="ml-6 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
