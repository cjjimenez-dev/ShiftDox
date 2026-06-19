import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, FileSpreadsheet, Presentation, FileImage, Image as ImageIcon } from 'lucide-react';

const TOOLS = [
  { id: 'pdf-to-word', title: 'PDF to Word', desc: 'Transform your PDFs into fully editable Word documents in seconds.', icon: <FileText size={32} className="text-blue-400" /> },
  { id: 'word-to-pdf', title: 'Word to PDF', desc: 'Securely convert your Word documents into universally compatible PDF format.', icon: <FileText size={32} className="text-purple-400" /> },
  { id: 'pdf-to-excel', title: 'PDF to Excel', desc: 'Pull tables and data directly from PDFs into formatted Excel sheets.', icon: <FileSpreadsheet size={32} className="text-emerald-400" /> },
  { id: 'excel-to-pdf', title: 'Excel to PDF', desc: 'Turn complex Excel spreadsheets into clean, read-only PDF documents.', icon: <FileSpreadsheet size={32} className="text-teal-400" /> },
  { id: 'pdf-to-powerpoint', title: 'PDF to PowerPoint', desc: 'Extract presentations from PDFs into editable PowerPoint slides.', icon: <Presentation size={32} className="text-orange-400" /> },
  { id: 'powerpoint-to-pdf', title: 'PowerPoint to PDF', desc: 'Save your PowerPoint slideshows as static, easy-to-share PDF files.', icon: <Presentation size={32} className="text-red-400" /> },
  { id: 'pdf-to-jpg', title: 'PDF to JPG', desc: 'Extract high-quality JPG image files directly from your PDF pages.', icon: <FileImage size={32} className="text-yellow-400" /> },
  { id: 'jpg-to-pdf', title: 'JPG to PDF', desc: 'Combine multiple JPG images into a single, organized PDF document.', icon: <ImageIcon size={32} className="text-amber-400" /> },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 text-white tracking-tight">Your Ultimate Document Conversion Suite</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Experience lightning-fast, highly secure, and completely free document transformations. Switch effortlessly between PDFs, Word documents, Excel sheets, and images.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TOOLS.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => navigate(`/tool/${tool.id}`)}
            className="glass-panel p-6 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group flex flex-col items-center text-center h-full"
          >
            <div className="mb-5 p-4 rounded-2xl bg-slate-800/80 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              {tool.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{tool.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
