import { Calendar, MapPin, Building } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTheme } from '../contexts/ThemeContext';

const Experience = () => {
  const { currentTheme } = useTheme();

  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading development of enterprise-scale web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.',
      achievements: [
        'Increased application performance by 40% through optimization',
        'Led a team of 5 developers on multiple projects',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
      color: currentTheme.primary,
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client-facing applications using modern web technologies. Collaborated closely with design and product teams.',
      achievements: [
        'Built 3 major features that increased user engagement by 35%',
        'Reduced bug reports by 50% through comprehensive testing',
        'Contributed to open-source projects used by 10k+ developers',
      ],
      color: currentTheme.secondary,
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      location: 'New York, NY',
      period: '2019 - 2020',
      description: 'Specialized in creating responsive, interactive user interfaces for client projects across various industries including e-commerce and healthcare.',
      achievements: [
        'Delivered 15+ client projects on time and within budget',
        'Improved website loading speeds by 50% on average',
        'Received "Developer of the Year" award',
      ],
      color: currentTheme.gradient,
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'Web Solutions Inc',
      location: 'Chicago, IL',
      period: '2018 - 2019',
      description: 'Started my journey in web development, working on various small to medium-sized projects and learning from senior developers.',
      achievements: [
        'Successfully completed onboarding program in record time',
        'Contributed to 10+ client projects',
        'Earned React and Node.js certifications',
      ],
      color: currentTheme.primary,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <AnimatedBackground />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
            Experience
          </h1>
          <p className={`text-xl text-${currentTheme.text} max-w-3xl mx-auto`}>
            My professional journey through various roles and companies, building expertise in modern web development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b ${currentTheme.primary}`}></div>

          {experiences.map((experience, index) => (
            <div key={experience.id} className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'} md:w-1/2`}>
              {/* Timeline Dot */}
              <div className={`absolute left-0 md:left-auto ${index % 2 === 0 ? 'md:-left-4' : 'md:-right-4'} w-8 h-8 bg-gradient-to-r ${experience.color} rounded-full border-4 border-white shadow-lg z-10`}></div>
              
              {/* Content Card */}
              <div 
                className={`ml-12 md:ml-0 bg-${currentTheme.card} backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className={`text-xl font-bold text-${currentTheme.text} mb-1`}>{experience.title}</h3>
                  <div className={`flex flex-wrap gap-4 text-sm text-${currentTheme.text} opacity-70 mb-2`}>
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>{experience.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-${currentTheme.text} opacity-80 mb-4`}>{experience.description}</p>

                {/* Achievements */}
                <div>
                  <h4 className={`font-semibold text-${currentTheme.text} mb-2`}>Key Achievements:</h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className={`text-${currentTheme.text} opacity-80 text-sm flex items-start gap-2`}>
                        <span className={`w-2 h-2 bg-gradient-to-r ${currentTheme.primary} rounded-full mt-2 flex-shrink-0`}></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className={`mt-16 bg-${currentTheme.card} backdrop-blur-sm rounded-2xl p-8 shadow-xl`}>
          <h2 className={`text-3xl font-bold text-${currentTheme.text} mb-6 text-center`}>Education</h2>
          <div className="text-center">
            <h3 className={`text-xl font-bold text-${currentTheme.text} mb-2`}>Bachelor of Science in Computer Science</h3>
            <p className={`text-${currentTheme.text} opacity-80 mb-2`}>University of Technology • 2014 - 2018</p>
            <p className={`text-${currentTheme.text} opacity-70`}>Graduated Magna Cum Laude • GPA: 3.8/4.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;