import { useState } from "react";
import DragDropZone from "../../../components/FileUpload/DragDropZone";
import Button from "../../../components/UI/Button";
import ProgressBar from "../../../components/UI/ProgressBar";
import usePdfOperations from "../hooks/usePdfOperations";

export default function PdfDashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const { progress, loading, merge, imagesToPdf, compress } =
    usePdfOperations();

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]); // append files
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      {/* Premium Contact Banner */}
      <div className="absolute top-6 w-full flex justify-center px-4">
        <div
          className="w-full max-w-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
            text-white rounded-2xl shadow-xl p-4 flex flex-col sm:flex-row 
            items-center justify-between gap-3"
        >
          <div className="text-center sm:text-left">
            <p className="text-sm opacity-90">Looking for a custom project?</p>
            <p className="font-semibold text-lg">
              Email Me{" "}
              <a
                href="mailto:xyz@gmail.com"
                className="underline underline-offset-4 hover:text-yellow-300 transition"
              >
                sabbir.comp@gmail.com
              </a>{" "}
              For Project or Anything Else.
            </p>
          </div>

          <a
            href="mailto:xyz@gmail.com"
            className="bg-white text-indigo-700 px-5 py-2 rounded-full font-semibold 
                 hover:bg-gray-100 transition shadow-md"
          >
            Contact Now
          </a>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6">📄 PDF Fusion</h2>

        {/* Drag Drop */}
        <DragDropZone onFiles={handleFiles} />

        {/* Selected File List */}
        {files.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-3 text-gray-700">Selected Files</h3>

            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Button
            onClick={() => merge(files)}
            disabled={loading || files.length === 0}
          >
            Merge PDF
          </Button>

          <Button
            onClick={() => imagesToPdf(files)}
            disabled={loading || files.length === 0}
          >
            Images → PDF
          </Button>

          <Button
            onClick={() => files[0] && compress(files[0])}
            disabled={loading || files.length === 0}
          >
            Compress PDF
          </Button>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mt-6">
            <ProgressBar value={progress} />
          </div>
        )}
        {/* Premium Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Developed with <span className="text-red-500 animate-pulse">❤</span>{" "}
            by{" "}
            <a
              href="https://github.com/sabbiraliseikh892"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 
                 bg-clip-text text-transparent hover:opacity-80 transition duration-200"
            >
              Sabbir
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
