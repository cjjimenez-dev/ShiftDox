import { useState } from 'react';
import { UploadCloud, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('pdf');
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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_format', targetFormat);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${API_URL}/api/conversions`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDownloadUrl(data.download_url);
        setIsDone(true);
      } else {
        setError('Conversion failed. Please try again.');
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
      className="w-full max-w-[900px] glass-panel p-10"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-white">Convert your file</h1>
        <p className="text-slate-400">Fast, secure, and high-quality document conversions.</p>
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
              className="w-full border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-colors"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
            >
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileInput}
              />
              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
              >
                <UploadCloud size={72} className="text-blue-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {file ? file.name : 'Drag & Drop your file here'}
              </h3>
              <p className="text-slate-400">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'or click to browse from your computer'}
              </p>
            </motion.label>

            {file && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-10 w-full"
              >
                <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-xl border border-white/5">
                  <span className="font-medium text-slate-400 pl-4">Convert to:</span>
                  <select 
                    className="bg-slate-800 text-white font-medium py-3 px-4 outline-none rounded-lg cursor-pointer border border-white/10 hover:border-blue-500/50 transition-colors" 
                    value={targetFormat} 
                    onChange={(e) => setTargetFormat(e.target.value)}
                  >
                    <option value="pdf">PDF Document (.pdf)</option>
                    <option value="docx">Word Document (.docx)</option>
                    <option value="txt">Text File (.txt)</option>
                    <option value="jpg">Image (.jpg)</option>
                  </select>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary !w-auto !px-8"
                  onClick={handleConvert}
                  disabled={isConverting}
                >
                  {isConverting ? 'Converting...' : 'Convert Now'} 
                  {!isConverting && <ArrowRight size={20} />}
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
              Your file has been successfully converted to {targetFormat.toUpperCase()}.
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
