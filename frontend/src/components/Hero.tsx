import { ArrowDown, Github, Linkedin, Mail, Download, Upload, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import createAxiosInstance from '@/axiosInstance';
import {setAdminDetails } from '@/redux/features/adminslice';
import { useDispatch } from 'react-redux';
import { setAbout } from '@/redux/features/aboutSlice';
import AboutState from '@/types/about';
import { AdminState } from '@/types/admin';
import { useAppselector } from '@/redux/store';

const Hero = () => {
  const { currentTheme } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const axiosInstance=createAxiosInstance()
  const dispatch = useDispatch();
  const adminData = useAppselector(state => state.admin);
  const aboutData = useAppselector(state => state.about);



  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Load saved profile image on component mount
  useState(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  });

  const fetchAdminProfile = async () => {
    try {
      const response = await axiosInstance.get('/admin/admin-profile');
      return response.data;

    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
      throw error;
    }
  };
  const fetchAbout = async () => {
    try {
      const response = await axiosInstance.get('/about');
      return response.data;

    } catch (error) {
      console.error('Failed to fetch admin about:', error);
      throw error;
    }
  };
useEffect(() => {
  fetchAdminProfile()
    .then((data) => {
      dispatch(setAdminDetails(data));
    })
    .catch((error) => {
      console.error('Error in fetchAdminProfile:', error);
    });

  fetchAbout()
    .then((data) => {
      dispatch(setAbout(data)); // Dispatch the API data directly
    })
    .catch((error) => {
      console.error('Error in fetchAbout:', error);
    });
}, []);

  const handleResumeDownload = () => {
    // Create a sample resume PDF content (in a real app, you'd have an actual PDF file)
    const resumeContent = `
Pramakant Kodamsingh - Full Stack Developer Resume

Contact Information:
Email: john.doe@example.com
Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johndoe

Experience:
• Senior Frontend Developer at Tech Corp (2020-Present)
• Full Stack Developer at StartupXYZ (2018-2020)
• Junior Developer at WebAgency (2017-2018)

Skills:
• React, TypeScript, Node.js, Python
• UI/UX Design, Figma, Adobe Creative Suite
• AWS, Docker, PostgreSQL

Education:
• Bachelor of Computer Science - University of Technology (2017)
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'John_Doe_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${currentTheme.primary} p-1 animate-pulse relative overflow-hidden`}>
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className={`w-full h-full rounded-full bg-${currentTheme.card} flex items-center justify-center text-4xl font-bold text-${currentTheme.text}`}>
                {adminData?.name}
              </div>
            )}
            {/* Upload overlay */}
            <button
              onClick={handleUploadClick}
              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 rounded-full flex items-center justify-center group"
            >
              <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
            </button>
          </div>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Main Content */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent animate-fade-in`}>
          {adminData?.name}
        </h1>    
        <p className={`text-xl md:text-2xl text-${currentTheme.text} mb-4 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          Full Stack Developer & UI/UX Designer
        </p>
        
        <p className={`text-lg text-${currentTheme.text} opacity-70 mb-8 max-w-2xl mx-auto animate-fade-in`} style={{ animationDelay: '0.4s' }}>
          Crafting beautiful, functional, and user-centered digital experiences with passion and precision.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a href={aboutData?.githubId} target="_blank" rel="noopener noreferrer "className={`p-3 bg-${currentTheme.card} backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-${currentTheme.text} hover:text-${currentTheme.accent}`}>
            <Github size={24} />
          </a>
          <a href={aboutData?.linkedinId} target="_blank" rel="noopener noreferrer" className={`p-3 bg-${currentTheme.card} backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-${currentTheme.text} hover:text-${currentTheme.accent}`}>
            <Linkedin size={24} />
          </a>
          <Link to="/contact" className={`p-3 bg-${currentTheme.card} backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-${currentTheme.text} hover:text-${currentTheme.accent}`}>
            <Mail size={24} />
          </Link>
          <button 
            onClick={handleResumeDownload}
            className={`p-3 bg-${currentTheme.card} backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-${currentTheme.text} hover:text-${currentTheme.accent}`}
            title="Download Resume"
          >
            <Download size={24} />
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Link 
            to="/projects"
            className={`px-8 py-3 bg-gradient-to-r ${currentTheme.primary} text-white rounded-full font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            View My Work
          </Link>
          <Link 
            to="/about"
            className={`px-8 py-3 bg-${currentTheme.card} text-${currentTheme.text} rounded-full font-semibold border-2 border-${currentTheme.accent} hover:bg-gradient-to-r hover:${currentTheme.primary} hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            About Me
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ArrowDown className={`mx-auto text-${currentTheme.text} opacity-60`} size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
