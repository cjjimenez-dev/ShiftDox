import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  FileImage, 
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const TOOLS = [
  { id: 'pdf-to-word', title: 'PDF to Word', desc: 'Convert PDF files to editable Word documents.', icon: <FileText size={24} className="text-[#a855f7]" />, color: 'bg-[#a855f7]/10' },
  { id: 'word-to-pdf', title: 'Word to PDF', desc: 'Convert Word documents to PDF files.', icon: <FileText size={24} className="text-[#0ea5e9]" />, color: 'bg-[#0ea5e9]/10' },
  { id: 'pdf-to-excel', title: 'PDF to Excel', desc: 'Extract spreadsheet data from PDFs to Excel.', icon: <FileSpreadsheet size={24} className="text-[#06b6d4]" />, color: 'bg-[#06b6d4]/10' },
  { id: 'excel-to-pdf', title: 'Excel to PDF', desc: 'Convert Excel spreadsheets to PDF documents.', icon: <FileSpreadsheet size={24} className="text-[#14b8a6]" />, color: 'bg-[#14b8a6]/10' },
  { id: 'pdf-to-powerpoint', title: 'PDF to PPT', desc: 'Turn your PDF files into easy to edit PPT slideshows.', icon: <Presentation size={24} className="text-[#f97316]" />, color: 'bg-[#f97316]/10' },
  { id: 'powerpoint-to-pdf', title: 'PPT to PDF', desc: 'Make PPT slideshows easy to view by converting them to PDF.', icon: <Presentation size={24} className="text-[#f43f5e]" />, color: 'bg-[#f43f5e]/10' },
  { id: 'pdf-to-jpg', title: 'PDF to JPG', desc: 'Convert each PDF page into a JPG image.', icon: <FileImage size={24} className="text-[#f59e0b]" />, color: 'bg-[#f59e0b]/10' },
  { id: 'jpg-to-pdf', title: 'JPG to PDF', desc: 'Convert JPG images to PDF documents.', icon: <ImageIcon size={24} className="text-[#0ea5e9]" />, color: 'bg-[#0ea5e9]/10' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Section */}
      <div className="text-center mt-12 mb-20 max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
          Everything you need for PDFs, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">reimagined.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          Experience the fastest, most beautiful way to manage your documents. 100% Free.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-8 mb-32">
        {TOOLS.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => navigate(`/tool/${tool.id}`)}
            className="bg-[#0B101E] border border-white/5 rounded-2xl p-8 cursor-pointer hover:border-blue-500/30 hover:bg-[#0D1426] transition-all duration-300 group flex flex-col items-center text-center h-full shadow-lg shadow-black/20"
          >
            <div className={`mb-6 p-4 rounded-full ${tool.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
              {tool.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight">{tool.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Feature Section: Precision Engine */}
      <div className="w-full max-w-7xl px-8 mb-32 flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10"
        >
          <img src="/precision_engine.png" alt="Precision Engine Dashboard" className="w-full h-auto object-cover" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Precision engine,</h2>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 tracking-tight">zero friction.</h2>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Our underlying engine uses proprietary compression algorithms that keep your files crisp while reducing size by up to 90%. Every conversion is processed in a secure sandbox, ensuring your data never leaks.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-cyan-400" />
              <span className="text-white font-medium">AES-256 Bit Encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-cyan-400" />
              <span className="text-white font-medium">Cloud-Optimized Processing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-cyan-400" />
              <span className="text-white font-medium">No File Size Limits</span>
            </div>
          </div>

          <button className="flex items-center gap-2 text-white font-medium border border-white/10 bg-[#0B101E] px-6 py-3 rounded-xl hover:bg-white/5 transition-colors w-fit">
            Learn about our API <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-8 px-10 mt-auto bg-[#0A0F1C]/50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-blue-400" />
          <div>
            <span className="text-lg font-bold text-white tracking-tight block">ShiftDox</span>
            <span className="text-xs text-slate-500">© 2026 ShiftDox. Next-gen PDF Processing.</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          <a href="#" className="hover:text-white transition-colors">Developer Portal</a>
        </div>
      </footer>

    </div>
  );
}
