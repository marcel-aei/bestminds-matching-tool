import valentumLogo from "@/assets/valentum-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={valentumLogo} alt="Valentum Engineering" className="h-12" />
          <div className="h-6 w-px bg-border" />
          <span className="font-display text-sm font-medium text-muted-foreground tracking-wide">
            Kandidaten-Matching
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-success" />
          n8n Workflow verbunden
        </div>
      </div>
    </header>
  );
};

export default Header;
