import apiClient from "../../../config/axiosConfig";

export const uploadFiles = (
  endpoint: string,
  files: File[],
  onProgress: (percent: number) => void,
) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return apiClient.post(`/pdf/${endpoint}`, formData, {
    responseType: "blob",
    onUploadProgress: (e) => {
      const total = e.total ?? 0;
      const percent = total ? Math.round((e.loaded * 100) / total) : 0;
      onProgress(percent);
    },
  });
};

export const compressFile = (
  file: File,
  onProgress: (percent: number) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post("/pdf/compress", formData, {
    responseType: "blob",
    onUploadProgress: (e) => {
      const total = e.total ?? 0;
      const percent = total ? Math.round((e.loaded * 100) / total) : 0;
      onProgress(percent);
    },
  });
};
