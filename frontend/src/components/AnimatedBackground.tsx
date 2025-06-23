// const AnimatedBackground = () => {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100" />
      
//       {/* Floating Shapes */}
//       <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-gray-700 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
//       <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-gray-600 to-blue-600 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
//       <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-gray-800 to-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
//       <div className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-r from-blue-400 to-gray-700 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
      
//       {/* Floating Triangles */}
//       <div className="absolute top-60 left-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-blue-400 opacity-70 animate-pulse" style={{ animationDuration: '2s' }} />
//       <div className="absolute bottom-60 right-1/4 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-gray-600 opacity-70 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
//     </div>
//   );
// };

// export default AnimatedBackground;

import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.background}`} />
    </div>
  );
};

export default AnimatedBackground;
