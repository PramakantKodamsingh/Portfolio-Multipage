import { Code, Palette, Zap, Heart, Download } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTheme } from '../contexts/ThemeContext';
import { useAppselector } from '@/redux/store';

const About = () => {
  const { currentTheme } = useTheme();
    const adminData = useAppselector(state => state.admin);
  const aboutData = useAppselector(state => state.about);
  

  const skills = [
    { name: 'Frontend Development', level: 90, color: currentTheme.primary },
    { name: 'Backend Development', level: 85, color: currentTheme.secondary },
    { name: 'UI/UX Design', level: 80, color: currentTheme.gradient },
    { name: 'Mobile Development', level: 75, color: currentTheme.primary },
  ];

  const interests = [
    { icon: Code, title: 'Clean Code', description: 'Writing maintainable and efficient code' },
    { icon: Palette, title: 'Design Systems', description: 'Creating cohesive user experiences' },
    { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency' },
    { icon: Heart, title: 'User Focus', description: 'Building with empathy and accessibility' },
  ];

const handleResumeDownload = async () => {
  if (!aboutData?.resume || !adminData?.name) {
    console.error('Missing resume URL or admin name');
    return;
  }
  try {
    // Modify Cloudinary URL for forced download
    const downloadUrl = aboutData.resume.replace(
      '/upload/',
      '/upload/fl_attachment/'
    );
    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error('Failed to fetch resume');

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const formattedName = adminData.name
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special chars
      .replace(/\s+/g, '_'); // Replace spaces with underscores
    const fileName = `${formattedName}_Resume.pdf`;

    // Create and trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Free memory
    }, 100);

  } catch (error) {
    console.error('Download failed:', error);
  }
};

  return (
    <div className="min-h-screen pt-20">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
            About Me
          </h1>
          <p className={`text-xl text-${currentTheme.text} max-w-3xl mx-auto mb-8`}>
            I'm a passionate developer who loves creating beautiful, functional, and user-centered digital experiences.
          </p>
          
          {/* Download Resume Button */}
          <button
            onClick={handleResumeDownload}
            className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${currentTheme.primary} text-white rounded-full font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            <Download size={20} />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className={`bg-${currentTheme.card} backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>My Story</h2>
            <p className={`text-${currentTheme.text} opacity-80 mb-4`}>
              With over 5 years of experience in web development, I've had the pleasure of working with startups, 
              agencies, and enterprises to bring digital ideas to life. My journey started with a curiosity about 
              how websites work, and it has evolved into a passion for creating exceptional user experiences.
            </p>
            <p className={`text-${currentTheme.text} opacity-80`}>
              I believe that great software is built at the intersection of technical excellence and human empathy. 
              Every line of code I write is guided by the question: "How can this make someone's day better?"
            </p>
          </div>

          <div className={`bg-${currentTheme.card} backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            <h2 className={`text-2xl font-bold text-${currentTheme.text} mb-4`}>When I'm Not Coding</h2>
            <p className={`text-${currentTheme.text} opacity-80 mb-4`}>
              You'll find me exploring the latest design trends, contributing to open-source projects, or mentoring 
              aspiring developers. I'm also an avid photographer and love capturing the beauty in everyday moments.
            </p>
            <p className={`text-${currentTheme.text} opacity-80`}>
              I'm always excited to connect with fellow creators and discuss new ideas, technologies, and 
              opportunities to make the web a more inclusive and delightful place.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center text-${currentTheme.text} mb-12`}>Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`bg-${currentTheme.card} backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-semibold text-${currentTheme.text}`}>{skill.name}</h3>
                  <span className={`text-sm text-${currentTheme.text} opacity-70`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%`, animationDelay: `${index * 0.2}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <h2 className={`text-3xl font-bold text-center text-${currentTheme.text} mb-12`}>What Drives Me</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <div 
                key={interest.title} 
                className={`bg-${currentTheme.card} backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${currentTheme.primary} rounded-full flex items-center justify-center`}>
                  <interest.icon className="text-white" size={24} />
                </div>
                <h3 className={`font-semibold text-${currentTheme.text} mb-2`}>{interest.title}</h3>
                <p className={`text-${currentTheme.text} opacity-70 text-sm`}>{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
