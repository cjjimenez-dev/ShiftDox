import { FileText, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        login({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error('Failed to fetch user info from Google', error);
      }
    },
    onError: () => {
      console.error('Google Login Failed');
    }
  });

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center py-6 px-10 bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="p-1.5 bg-blue-500/20 rounded-md">
          <FileText size={20} className="text-blue-400" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          ShiftDox
        </span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        <a href="/" className="text-sm font-medium text-white border-b-2 border-blue-500 pb-1">Home</a>
        <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors pb-1">Tools</a>
        <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors pb-1">Pricing</a>
        <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors pb-1">API</a>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-white/10" />
              <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
            </div>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-white transition-colors p-2"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => handleGoogleLogin()} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</button>
            <button onClick={() => handleGoogleLogin()} className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all">
              Sign Up
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
