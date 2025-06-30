import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, User, Briefcase, Mail, Code, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Projects', path: '/projects', icon: Code },
    { name: 'Experience', path: '/experience', icon: Briefcase },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-${currentTheme.card} backdrop-blur-md border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
              Portfolio
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${currentTheme.primary} text-white shadow-lg`
                      : `text-${currentTheme.text} hover:text-${currentTheme.accent} hover:bg-${currentTheme.accent}/10`
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg text-${currentTheme.text} hover:bg-${currentTheme.accent}/10`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden bg-${currentTheme.card} backdrop-blur-md border-t border-gray-200`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${currentTheme.primary} text-white`
                      : `text-${currentTheme.text} hover:text-${currentTheme.accent} hover:bg-${currentTheme.accent}/10`
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
