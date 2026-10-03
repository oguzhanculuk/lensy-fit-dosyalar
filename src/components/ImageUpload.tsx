import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Camera, RefreshCw, Trash2 } from 'lucide-react';

export interface ImageUploadData {
  data: string; // base64
  mimeType: string;
}

interface ImageUploadProps {
  label: string;
  icon: React.ReactNode;
  value: ImageUploadData | null;
  onChange: (data: ImageUploadData | null) => void;
  aspectRatio ?: 'square' | 'portrait';
  uploadText?: React.ReactNode;
  removeTitle?: string;
}

export function ImageUpload({ label, icon, value, onChange, aspectRatio = 'square', uploadText = "Yüklemek İçin\nTıkla", removeTitle = "Kaldır" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64Data = result.split(',')[1];
      onChange({ data: base64Data, mimeType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const aspectRatioClass = aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{label}</span>
      <div
        className={`relative w-full ${aspectRatioClass} rounded-[1.5rem] overflow-hidden border transition-all duration-300 ease-out group/container ${
          isDragging
            ? 'border-black/[0.08] bg-black/[0.03] scale-[1.02]'
            : value 
              ? 'border-transparent bg-black/[0.02] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]' 
              : 'border-dashed border-black/[0.06] bg-white/40 hover:bg-white hover:border-black/[0.12]'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !value && fileInputRef.current?.click()}
      >
        {!value ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-stone-400 cursor-pointer group">
            <div className="p-4 rounded-[1.2rem] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-black/[0.04] text-stone-400 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] group-hover:text-stone-600 mb-3">
              {icon}
            </div>
            <div className="flex items-center justify-center gap-2 w-full pointer-events-none px-2">
              <button
                type="button"
                className="flex items-center justify-center px-4 h-8 bg-white shadow-sm border border-black/[0.04] rounded-full text-[10px] font-bold text-stone-500 hover:text-stone-900 transition-all hover:scale-105 active:scale-95 pointer-events-auto"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                {uploadText}
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); cameraInputRef.current?.click(); }}
                className="flex items-center justify-center w-8 h-8 bg-white shadow-sm border border-black/[0.04] rounded-full text-stone-500 hover:text-stone-900 transition-all hover:scale-110 active:scale-95 pointer-events-auto shrink-0"
                title="Kamera"
              >
                <Camera size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 group">
            <img 
              src={`data:${value.mimeType};base64,${value.data}`} 
              alt={label} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Action Buttons */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3 pointer-events-none">
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileInputRef.current?.click(); }}
                className="flex items-center justify-center w-9 h-9 bg-white/95 backdrop-blur-md rounded-full text-stone-700 hover:text-black shadow-lg transition-all hover:scale-110 active:scale-95 pointer-events-auto"
                title="Değiştir"
              >
                <RefreshCw size={14} strokeWidth={2.5} />
              </button>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); cameraInputRef.current?.click(); }}
                className="flex items-center justify-center w-9 h-9 bg-white/95 backdrop-blur-md rounded-full text-stone-700 hover:text-black shadow-lg transition-all hover:scale-110 active:scale-95 pointer-events-auto"
                title="Kamera"
              >
                <Camera size={14} strokeWidth={2.5} />
              </button>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange(null); }}
                className="flex items-center justify-center w-9 h-9 bg-red-500/95 backdrop-blur-md rounded-full text-white hover:bg-red-600 shadow-lg transition-all hover:scale-110 active:scale-95 pointer-events-auto"
                title={removeTitle}
              >
                <Trash2 size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        <input 
          type="file" 
          ref={cameraInputRef} 
          className="hidden" 
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
}
