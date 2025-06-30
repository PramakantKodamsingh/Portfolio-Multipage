import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '../components/AnimatedBackground';
import { useTheme } from '../contexts/ThemeContext';

// Sample blog posts data - same as in Blog.tsx
const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Explore the benefits of using TypeScript with React to build more robust and maintainable web applications.",
    content: `
      <h2>Introduction</h2>
      <p>TypeScript has become an essential tool for modern React development. In this post, we'll explore how combining React with TypeScript can significantly improve your development experience and code quality.</p>
      
      <h2>Why TypeScript with React?</h2>
      <p>TypeScript provides static type checking, which helps catch errors during development rather than runtime. This is particularly valuable in React applications where props and state management can become complex.</p>
      
      <h2>Getting Started</h2>
      <p>Setting up a React project with TypeScript is easier than ever. You can use Create React App with TypeScript template or modern tools like Vite for a faster development experience.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Define interfaces for your component props</li>
        <li>Use proper typing for hooks like useState and useEffect</li>
        <li>Leverage TypeScript's strict mode for better type safety</li>
        <li>Create custom types for your application's domain</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>TypeScript and React make a powerful combination for building maintainable, scalable web applications. The initial learning curve is worth the long-term benefits of better code quality and developer experience.</p>
    `,
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    author: "Pramakant Kodamsingh"
  },
  {
    id: 2,
    title: "The Future of Frontend Development",
    excerpt: "Discussing upcoming trends and technologies that will shape the future of frontend development.",
    content: `
      <h2>The Evolution of Frontend</h2>
      <p>Frontend development has evolved dramatically over the past decade. From simple HTML and CSS to complex single-page applications, we've seen remarkable changes in how we build web experiences.</p>
      
      <h2>Emerging Trends</h2>
      <p>Several trends are shaping the future of frontend development:</p>
      
      <h3>1. Component-Based Architecture</h3>
      <p>Frameworks like React, Vue, and Angular have popularized component-based thinking, making applications more modular and reusable.</p>
      
      <h3>2. JAMstack and Static Site Generation</h3>
      <p>The JAMstack approach is gaining popularity for its performance benefits and simplified deployment processes.</p>
      
      <h3>3. WebAssembly</h3>
      <p>WebAssembly is opening new possibilities for high-performance web applications, allowing languages like Rust and C++ to run in browsers.</p>
      
      <h2>Looking Ahead</h2>
      <p>The future of frontend development looks exciting with continued focus on performance, developer experience, and user-centric design.</p>
    `,
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    author: "Pramakant Kodamsingh"
  },
  {
    id: 3,
    title: "Best Practices for UI/UX Design",
    excerpt: "Essential principles and practices for creating user-friendly and visually appealing interfaces.",
    content: `
      <h2>Understanding User Experience</h2>
      <p>Great UI/UX design is about creating intuitive, accessible, and delightful experiences for users. It requires understanding both user needs and business goals.</p>
      
      <h2>Core Principles</h2>
      
      <h3>1. User-Centered Design</h3>
      <p>Always start with understanding your users. Conduct research, create personas, and test your designs with real users.</p>
      
      <h3>2. Consistency</h3>
      <p>Maintain consistent patterns, colors, typography, and interactions throughout your application.</p>
      
      <h3>3. Accessibility</h3>
      <p>Design for all users, including those with disabilities. Use proper contrast ratios, keyboard navigation, and screen reader support.</p>
      
      <h3>4. Visual Hierarchy</h3>
      <p>Guide users' attention through proper use of typography, color, and spacing to create clear information hierarchy.</p>
      
      <h2>Design Process</h2>
      <p>A structured design process helps ensure better outcomes:</p>
      <ol>
        <li>Research and discovery</li>
        <li>Information architecture</li>
        <li>Wireframing and prototyping</li>
        <li>Visual design</li>
        <li>Testing and iteration</li>
      </ol>
    `,
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
    author: "Pramakant Kodamsingh"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const { currentTheme } = useTheme();
  const post = blogPosts.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-4xl font-bold text-${currentTheme.text} mb-4`}>Post Not Found</h1>
          <Link to="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className={`inline-flex items-center space-x-2 text-${currentTheme.accent} hover:text-${currentTheme.primary} mb-8 transition-colors duration-300`}>
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
          
          <div className="mb-8">
            <span className={`bg-gradient-to-r ${currentTheme.primary} text-white px-4 py-2 rounded-full text-sm font-medium`}>
              {post.category}
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${currentTheme.text} animate-fade-in`}>
            {post.title}
          </h1>
          
          <div className={`flex flex-wrap items-center space-x-6 text-${currentTheme.text} opacity-70 mb-8 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`prose prose-lg max-w-none text-${currentTheme.text} animate-fade-in`}
            style={{ animationDelay: '0.6s' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogPost;