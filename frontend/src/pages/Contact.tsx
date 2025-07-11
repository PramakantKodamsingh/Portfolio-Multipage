import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useToast } from '../hooks/use-toast';
import { useAppselector } from '@/redux/store';
import createAxiosInstance from '@/axiosInstance';

const Contact = () => {
    const adminData = useAppselector(state => state.admin);
    const aboutData = useAppselector(state => state.about);
    const axiosInstance = createAxiosInstance();
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post('/auth/send-email', formData);

      toast({
        title: response.data.message,
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', from: '', subject: '', message: '' });
    } catch (err: any) {
      toast({
        title: "Failed to send message",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  const contactInfo = [
    { icon: Mail, label: 'Email', value: `${adminData?.email}` || '', href: 'mailto:${adminData?.email}' },
    { icon: Phone, label: 'Phone', value: `+91 ${aboutData?.phone}` || '', href: `tel:+91 ${aboutData?.phone}` },
    { icon: MapPin, label: 'Location', value: `${aboutData?.address}`, href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: `${aboutData?.github}`, color: 'hover:text-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', href: `${aboutData?.linkedIn}`, color: 'hover:text-blue-600' },
    // { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-blue-400' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{info.label}</p>
                      <p className="text-gray-800 font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Connect With Me</h2>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
              
              <p className="text-gray-600 mt-4">
                Follow me on social media for updates on my latest projects and thoughts on web development.
              </p>
            </div>

            {/* Quick Response */}

          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mt-8 text-white shadow-xl">
          <h3 className="text-xl font-bold mb-4">Quick Response</h3>
          <p className="mb-4">
            I typically respond to emails within 24 hours. For urgent matters, feel free to give me a call!
          </p>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Usually available 9 AM - 6 PM PST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;