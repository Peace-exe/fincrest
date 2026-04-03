const Footer = () => {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading text-foreground mb-3">
            <span className="text-accent">Heritage</span> Finance
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Distinguished wealth management since 1887.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-body tracking-widest uppercase text-muted-foreground mb-3">Product</h4>
          <ul className="space-y-2 text-sm font-body text-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-body tracking-widest uppercase text-muted-foreground mb-3">Company</h4>
          <ul className="space-y-2 text-sm font-body text-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-body tracking-widest uppercase text-muted-foreground mb-3">Legal</h4>
          <ul className="space-y-2 text-sm font-body text-foreground">
            <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Compliance</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground font-body">
          © 2024 Heritage Finance. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
