import { Link } from 'react-router-dom';
import { Code, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
                <Terminal className="w-5 h-5 text-background" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan to-purple opacity-50 blur-lg group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-gradient-primary">DSA</span>
              <span className="text-foreground">Mastery</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Topics
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
