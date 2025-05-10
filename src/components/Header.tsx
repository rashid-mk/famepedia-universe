
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Search, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import SearchDialog from './SearchDialog';
import { people } from '@/data/people';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/login');
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight transition-transform duration-300 hover:scale-105"
        >
          <span className="text-gradient">Fame</span>
          <span className="text-gray-900">pedia</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors duration-200">Home</Link>
          <a href="#people" className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors duration-200">Top People</a>
          <a href="#categories" className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors duration-200">Categories</a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-google-blue transition-colors duration-200">About</a>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-google-blue to-google-green rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <button 
              className="relative px-6 py-2 bg-white rounded-full text-sm font-medium text-gray-900 group-hover:text-google-blue transition-all duration-200"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-4 h-4 inline-block mr-2" />
              Search
            </button>
          </div>

          {/* Auth Button */}
          <div className="relative">
            {user ? (
              <button 
                className="flex items-center space-x-1 px-6 py-2 bg-google-blue text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all duration-200"
                onClick={() => setIsAuthOpen(!isAuthOpen)}
              >
                <UserIcon className="w-4 h-4" />
                <span>My Account</span>
              </button>
            ) : (
              <button 
                className="flex items-center space-x-1 px-6 py-2 bg-google-blue text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all duration-200"
                onClick={() => setIsAuthOpen(!isAuthOpen)}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
            
            {/* Auth Dropdown */}
            {isAuthOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
                <div className="py-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-sm">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => { setIsAuthOpen(false); signOut(); }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-google-light-blue hover:text-google-blue transition-colors" onClick={() => setIsAuthOpen(false)}>
                        Login
                      </Link>
                      <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-google-light-blue hover:text-google-blue transition-colors" onClick={() => setIsAuthOpen(false)}>
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 hover:text-google-blue transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg animate-fadeIn">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            <Link to="/" className="text-lg font-medium text-gray-900 hover:text-google-blue transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <a href="#people" className="text-lg font-medium text-gray-900 hover:text-google-blue transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Top People</a>
            <a href="#categories" className="text-lg font-medium text-gray-900 hover:text-google-blue transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Categories</a>
            <a href="#about" className="text-lg font-medium text-gray-900 hover:text-google-blue transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>About</a>
            
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search famous people..."
                className="w-full py-3 px-4 bg-gray-100 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-google-blue transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            {/* Auth buttons for mobile */}
            <div className="flex flex-col space-y-2 mt-2">
              {user ? (
                <>
                  <div className="py-2 px-4 bg-gray-100 rounded-md">
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setIsMenuOpen(false); signOut(); }}
                    className="py-3 px-4 bg-red-600 text-white rounded-full text-center font-medium hover:bg-red-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-3 px-4 bg-google-blue text-white rounded-full text-center font-medium hover:bg-blue-600 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="py-3 px-4 bg-white border border-google-blue text-google-blue rounded-full text-center font-medium hover:bg-google-light-blue transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
        people={people}
      />
    </header>
  );
};

export default Header;
