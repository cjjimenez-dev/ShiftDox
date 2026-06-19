import { FileDown, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <FileDown size={28} />
        <span>ShiftDox</span>
      </div>
      
      {!isAuthPage && (
        <div className="nav-links">
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            onClick={() => navigate('/')}
          >
            <LogOut size={16} /> Exit
          </button>
        </div>
      )}
    </nav>
  );
}
