import * as FileSystem from 'expo-file-system';

export const getFileInfo = async (fileURI: string) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);

  return fileInfo;
};
