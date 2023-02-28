export const getFileExtension = (path: string) => {
  const lastDotIndex = path.lastIndexOf('.');
  const fileExtension = path.substring(lastDotIndex + 1);

  return fileExtension;
};
