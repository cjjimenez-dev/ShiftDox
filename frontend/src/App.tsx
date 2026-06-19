import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ConverterPage from './pages/ConverterPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex justify-center items-center p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tool/:id" element={<ConverterPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
