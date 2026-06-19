import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDown, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy authentication, redirect to dashboard
    navigate('/dashboard');
  };

  const handleGuest = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-container glass-panel animate-fade-in">
      <div className="auth-header">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <FileDown size={48} color="var(--primary)" />
        </div>
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p>Convert your documents with lightning speed</p>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="input-field" placeholder="John Doe" required />
          </div>
        )}
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" className="input-field" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="input-field" placeholder="••••••••" required />
        </div>
        
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </a>
      </div>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <button onClick={handleGuest} className="btn btn-secondary">
        <User size={18} /> Continue as Guest
      </button>
    </div>
  );
}
