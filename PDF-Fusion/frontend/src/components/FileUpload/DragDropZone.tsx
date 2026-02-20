import { useState, DragEvent, useRef } from "react";

interface Props {
  onFiles: (files: File[]) => void;
}

export default function DragDropZone({ onFiles }: Props) {
  const [dragCount, setDragCount] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const prevent = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    prevent(e);
    setDragCount((prev) => prev + 1);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    prevent(e);
    setDragCount((prev) => prev - 1);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    prevent(e);
    setDragCount(0);
    const files = Array.from(e.dataTransfer.files);
    onFiles(files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFiles(Array.from(e.target.files));
    }
  };

  const isDragging = dragCount > 0;

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={prevent}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
        ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.02]"
            : "border-gray-300 bg-white hover:border-blue-400"
        }`}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="text-4xl">📂</div>

        <p className="text-lg font-semibold text-gray-700">
          {isDragging
            ? "Release to upload files"
            : "Drag & Drop PDF or Image Files"}
        </p>

        <p className="text-sm text-gray-500">or click to browse</p>
      </div>
    </div>
  );
}
