import { FileDown, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/';

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center py-5 px-8 bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <FileDown size={24} className="text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          ShiftDox
        </span>
      </div>
      
      {!isAuthPage && (
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary !py-2 !px-4 !w-auto text-sm"
            onClick={() => navigate('/')}
          >
            <LogOut size={16} /> Exit
          </motion.button>
        </div>
      )}
    </motion.nav>
  );
}
