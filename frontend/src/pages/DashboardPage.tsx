import { useState } from 'react';
import { UploadCloud, FileType2, ArrowRight, Download, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setIsDone(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setIsDone(false);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);
    // Simulate API call
    setTimeout(() => {
      setIsConverting(false);
      setIsDone(true);
    }, 2000);
  };

  return (
    <div className="dashboard-container glass-panel animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Convert your file</h1>
        <p style={{ color: 'var(--text-muted)' }}>Fast, secure, and high-quality document conversions.</p>
      </div>

      {!isDone ? (
        <>
          <label 
            className="drop-zone" 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            style={{ display: 'block' }}
          >
            <input 
              type="file" 
              style={{ display: 'none' }} 
              onChange={handleFileInput}
            />
            <UploadCloud size={64} className="drop-icon" />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              {file ? file.name : 'Drag & Drop your file here'}
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'or click to browse from your computer'}
            </p>
          </label>

          {file && (
            <div className="conversion-options animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Convert to:</span>
                <select 
                  className="select-field" 
                  value={targetFormat} 
                  onChange={(e) => setTargetFormat(e.target.value)}
                >
                  <option value="pdf">PDF Document (.pdf)</option>
                  <option value="docx">Word Document (.docx)</option>
                  <option value="txt">Text File (.txt)</option>
                  <option value="jpg">Image (.jpg)</option>
                </select>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: 'auto' }}
                onClick={handleConvert}
                disabled={isConverting}
              >
                {isConverting ? 'Converting...' : 'Convert Now'} 
                {!isConverting && <ArrowRight size={18} />}
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }} className="animate-fade-in">
          <CheckCircle2 size={80} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ marginBottom: '1rem' }}>Conversion Complete!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your file has been successfully converted to {targetFormat.toUpperCase()}.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ width: 'auto' }}>
              <Download size={18} /> Download Result
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ width: 'auto' }}
              onClick={() => {
                setFile(null);
                setIsDone(false);
              }}
            >
              Convert Another File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
