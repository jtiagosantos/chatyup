export const validateFileSize = (fileSize: number, maxFileSize: number) => {
  const fileSizeIsLessThanMaxFileSize = fileSize <= maxFileSize;

  return {
    isValidFile: fileSizeIsLessThanMaxFileSize,
  };
};
