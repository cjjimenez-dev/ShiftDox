import { useState } from 'react';
import { UploadCloud, ArrowRight, Download, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const TOOLS: Record<string, { title: string, desc: string, targetFormat: string, accept: string }> = {
  'pdf-to-word': { title: 'PDF to Word', desc: 'Convert PDF files to editable Word documents.', targetFormat: 'docx', accept: '.pdf' },
  'word-to-pdf': { title: 'Word to PDF', desc: 'Convert Word documents to PDF files.', targetFormat: 'pdf', accept: '.doc,.docx' },
  'pdf-to-excel': { title: 'PDF to Excel', desc: 'Extract spreadsheet data from PDFs to Excel.', targetFormat: 'xlsx', accept: '.pdf' },
  'excel-to-pdf': { title: 'Excel to PDF', desc: 'Convert Excel spreadsheets to PDF documents.', targetFormat: 'pdf', accept: '.xls,.xlsx' },
  'pdf-to-powerpoint': { title: 'PDF to PowerPoint', desc: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', targetFormat: 'pptx', accept: '.pdf' },
  'powerpoint-to-pdf': { title: 'PowerPoint to PDF', desc: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', targetFormat: 'pdf', accept: '.ppt,.pptx' },
  'pdf-to-jpg': { title: 'PDF to JPG', desc: 'Convert each PDF page into a JPG.', targetFormat: 'jpg', accept: '.pdf' },
  'jpg-to-pdf': { title: 'JPG to PDF', desc: 'Convert JPG images to PDF.', targetFormat: 'pdf', accept: '.jpg,.jpeg,.png' },
};

export default function ConverterPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tool = id && TOOLS[id] ? TOOLS[id] : TOOLS['pdf-to-word'];

  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setIsDone(false);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setIsDone(false);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_format', tool.targetFormat);

    try {
      const response = await fetch(`/api/conversions`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDownloadUrl(data.download_url);
        setIsDone(true);
      } else {
        const errData = await response.json().catch(() => null);
        setError(errData?.error || 'Conversion failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error: Unable to connect to the backend API.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[900px] glass-panel p-10 relative"
    >
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl font-bold mb-3 text-white">{tool.title}</h1>
        <p className="text-slate-400">{tool.desc}</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center font-medium shadow-lg shadow-red-500/5"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isDone ? (
          <motion.div
            key="upload-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <motion.label 
              whileHover={{ scale: 1.02 }}
              animate={{ 
                borderColor: isDragging ? '#3b82f6' : 'rgba(59, 130, 246, 0.4)',
                backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'
              }}
              className="w-full border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors relative"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
            >
              <input 
                type="file" 
                className="hidden" 
                accept={tool.accept}
                onChange={handleFileInput}
              />
              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
              >
                <UploadCloud size={72} className="text-blue-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {file ? file.name : 'Select or drop file'}
              </h3>
              <p className="text-slate-400">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : `Accepts ${tool.accept.toUpperCase()} files`}
              </p>
            </motion.label>

            {file && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-10 w-full"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary !w-auto !px-8 text-lg"
                  onClick={handleConvert}
                  disabled={isConverting}
                >
                  {isConverting ? 'Converting...' : `Convert to ${tool.targetFormat.toUpperCase()}`} 
                  {!isConverting && <ArrowRight size={24} />}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="success-state"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <CheckCircle2 size={96} className="text-green-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-3 text-white">Conversion Complete!</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Your file has been successfully converted to {tool.targetFormat.toUpperCase()}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary !w-auto" 
                onClick={handleDownload}
              >
                <Download size={20} /> Download Result
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary !w-auto" 
                onClick={() => {
                  setFile(null);
                  setIsDone(false);
                  setDownloadUrl(null);
                }}
              >
                Convert Another File
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
