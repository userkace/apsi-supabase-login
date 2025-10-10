import React, { useState, useEffect, useRef } from 'react';

const API_URL = 'https://truevoiceimg-935145982545.asia-southeast1.run.app/predict';

const TrueVoicePopup = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const fileListRef = useRef(null);

  // Load saved files on component mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const result = await chrome.storage.local.get('savedFiles');
        if (result.savedFiles) {
          setFiles(result.savedFiles);
        }
      } catch (err) {
        console.error('Failed to load files:', err);
      }
    };

    loadFiles();
  }, []);

  // Save files to storage whenever they change
  useEffect(() => {
    const saveFiles = async () => {
      try {
        await chrome.storage.local.set({ savedFiles: files });
      } catch (err) {
        console.error('Failed to save files:', err);
      }
    };

    if (files.length > 0) {
      saveFiles();
    }
  }, [files]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (fileList) => {
    const validFiles = Array.from(fileList).filter(file => file.type.startsWith('audio/'));
    
    if (validFiles.length === 0) {
      showError('Please select valid audio files');
      return;
    }

    for (const file of validFiles) {
      await addFile(file);
    }
  };

  const uploadAndPredict = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Failed to get prediction. Please try again.');
    }
  };

  const addFile = async (file) => {
    const fileId = Date.now().toString();
    const fileItem = {
      id: fileId,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    };

    setFiles(prevFiles => [...prevFiles, fileItem]);

    try {
      const result = await uploadAndPredict(file);
      
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'completed',
                result,
                progress: 100 
              } 
            : f
        )
      );
    } catch (error) {
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'error',
                error: error.message,
                progress: 0 
              } 
            : f
        )
      );
      showError(`Error processing ${file.name}: ${error.message}`);
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    chrome.storage.local.remove('savedFiles');
  };

  const toggleExpand = (fileId) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, expanded: !file.expanded } 
          : file
      )
    );
  };
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="header flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">TrueVoice</h3>
        <a 
          href="https://github.com/userkace/true-voice" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.431.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>

      {error && (
        <div className="bg-red-500/10 border-l-4 border-red-500 text-red-300 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <div 
        className={`upload-container border-2 border-dashed rounded-lg p-6 mb-4 transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          id="audio-upload" 
          accept="audio/*" 
          multiple 
          className="hidden"
          onChange={handleFileSelect}
        />
        <label 
          htmlFor="audio-upload" 
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <span className="text-2xl mb-2">🎵</span>
          <span className="text-sm text-center text-gray-300">
            {isDragging ? 'Drop audio files here' : 'Choose Audio Files'}
            <br/>
            <span className="text-xs text-gray-500">
              {isDragging ? '' : 'or drag and drop files here'}
            </span>
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 text-right">
          <button 
            onClick={clearAllFiles}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
      
      <div ref={fileListRef} className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-2">
        {files.map((file) => (
          <div 
            key={file.id}
            className={`bg-white/5 rounded-lg p-3 border border-white/10 ${file.expanded ? 'expanded' : ''}`}
          >
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(file.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
              </div>
              <div className="flex items-center space-x-2">
                {file.status === 'uploading' && (
                  <span className="text-xs text-yellow-400">
                    Uploading... {file.progress}%
                  </span>
                )}
                {file.status === 'error' && (
                  <span className="text-xs text-red-400">Error</span>
                )}
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${file.expanded ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {file.expanded && (
              <div className="mt-3 pt-3 border-t border-white/10">
                {file.status === 'completed' && file.result ? (
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="font-medium">Prediction:</span>{' '}
                      <span className="text-green-400">
                        {file.result.prediction || 'No prediction available'}
                      </span>
                    </div>
                    {file.result.confidence && (
                      <div>
                        <span className="font-medium">Confidence:</span>{' '}
                        <span className="text-blue-400">
                          {(file.result.confidence * 100).toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </div>
                ) : file.status === 'error' ? (
                  <div className="text-sm text-red-400">
                    {file.error || 'An error occurred while processing this file.'}
                  </div>
                ) : (
                  <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-500 h-2.5 rounded-full" 
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrueVoicePopup;
