import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-20 right-4 z-50 p-3 bg-gradient-to-r ${currentTheme.primary} text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300`}
        title="Change Theme"
      >
        <Palette size={20} />
      </button>

      {/* Theme Selector Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`bg-gradient-to-br ${currentTheme.card} backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-bold text-${currentTheme.text}`}>Choose Theme</h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 hover:bg-gray-200 rounded-full transition-colors text-${currentTheme.text}`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    currentTheme.id === theme.id 
                      ? `border-${theme.accent} bg-gradient-to-r ${theme.primary} text-white` 
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                    <div className="text-left">
                      <p className="font-semibold">{theme.name}</p>
                      <p className={`text-sm ${currentTheme.id === theme.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {theme.id === 'dark-mode' ? 'Dark theme with cyan accents' : 
                         theme.id === 'blue-grey' ? 'Professional blue and grey' :
                         theme.id === 'purple-pink' ? 'Creative purple and pink' :
                         theme.id === 'green-teal' ? 'Nature-inspired green tones' :
                         'Warm orange and red colors'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector;
