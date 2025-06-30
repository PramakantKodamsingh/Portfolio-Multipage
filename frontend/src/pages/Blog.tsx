import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTheme } from '../contexts/ThemeContext';

// Sample blog posts data - in a real app, this would come from a database
const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Explore the benefits of using TypeScript with React to build more robust and maintainable web applications.",
    content: "Full blog post content would go here...",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "The Future of Frontend Development",
    excerpt: "Discussing upcoming trends and technologies that will shape the future of frontend development.",
    content: "Full blog post content would go here...",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Best Practices for UI/UX Design",
    excerpt: "Essential principles and practices for creating user-friendly and visually appealing interfaces.",
    content: "Full blog post content would go here...",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop"
  }
];

const Blog = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent animate-fade-in`}>
            Blog
          </h1>
          <p className={`text-xl text-${currentTheme.text} mb-8 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            Thoughts, insights, and tutorials on web development and design
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in bg-${currentTheme.card} border-${currentTheme.accent}/20`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`bg-gradient-to-r ${currentTheme.primary} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className={`text-xl font-bold text-${currentTheme.text} group-hover:text-${currentTheme.accent} transition-colors duration-300`}>
                    {post.title}
                  </CardTitle>
                  <CardDescription className={`text-${currentTheme.text} opacity-70`}>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className={`flex items-center justify-between text-sm text-${currentTheme.text} opacity-70 mb-4`}>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className={`inline-flex items-center space-x-2 text-${currentTheme.accent} hover:text-${currentTheme.primary} font-medium transition-colors duration-300 group/link`}
                  >
                    <span>Read More</span>
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;