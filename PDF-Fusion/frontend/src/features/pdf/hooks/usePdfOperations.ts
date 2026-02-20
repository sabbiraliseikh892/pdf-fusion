import { useState } from "react";
import { uploadFiles, compressFile } from "../api/pdfService";
import downloadFile from "../../../utils/downloadFile";

export default function usePdfOperations() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const execute = async (apiCall: Promise<any>, filename: string) => {
    try {
      setLoading(true);
      const res = await apiCall;
      downloadFile(res.data, filename);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const merge = (files: File[]) =>
    execute(uploadFiles("merge", files, setProgress), "merged.pdf");

  const imagesToPdf = (files: File[]) =>
    execute(uploadFiles("images-to-pdf", files, setProgress), "images.pdf");

  const compress = (file: File) =>
    execute(compressFile(file, setProgress), "compressed.pdf");

  return { progress, loading, merge, imagesToPdf, compress };
}
