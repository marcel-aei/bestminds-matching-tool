import { useState } from "react";
import { Lock } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const PASSWORD = "valentum-demo-passwort";

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
      <div className="w-full max-w-sm text-center space-y-8">
        <div className="space-y-5">
          <div className="bg-white rounded-xl p-4 inline-block shadow-sm border border-[hsl(210,15%,88%)]">
            <img
              src="https://www.valentum.de/static/layout/valentum/site/valentum_engineering_logo.png"
              alt="Valentum Engineering"
              className="h-14"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
            Matching Tool
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-[hsl(210,15%,88%)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(204,100%,30%)]"
              style={{ fontFamily: "'Inter', sans-serif" }}
              autoFocus
            />
          </div>
          {error && (
            <p className="text-destructive text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Falsches Passwort.</p>
          )}
          <button
            type="submit"
            className="w-full h-11 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "hsl(204, 100%, 30%)" }}
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
