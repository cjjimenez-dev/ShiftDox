import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDown, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-[420px]"
    >
      <div className="glass-panel p-10 text-center">
        <div className="mb-8 flex flex-col items-center">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20"
          >
            <FileDown size={40} className="text-blue-400" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-400">Convert your documents with lightning speed</p>
        </div>

        <form onSubmit={handleSubmit} className="text-left space-y-5">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block mb-2 text-sm font-medium text-slate-400">Full Name</label>
                <input type="text" className="input-field" placeholder="John Doe" required={!isLogin} />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-400">Email Address</label>
            <input type="email" className="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-400">Password</label>
            <input type="password" className="input-field" placeholder="••••••••" required />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn btn-primary mt-4"
          >
            {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
          </motion.button>
        </form>

        <div className="mt-6 text-sm text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium ml-1"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <div className="flex items-center my-8 text-slate-500 text-sm">
          <div className="flex-1 border-b border-white/10"></div>
          <span className="px-4">OR</span>
          <div className="flex-1 border-b border-white/10"></div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard')} 
          className="btn btn-secondary text-slate-300"
        >
          <User size={18} /> Continue as Guest
        </motion.button>
      </div>
    </motion.div>
  );
}
