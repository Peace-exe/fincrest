import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3  bg-card/0 mt-2 ">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between rounded-xl backdrop-blur-md bg-background/80 border border-border shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-lg font-heading text-foreground">
            <span className="text-accent">Heritage</span> Finance
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-body text-foreground hover:text-accent transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-body gold-gradient px-4 py-2 rounded-md text-foreground hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
