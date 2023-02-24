import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = (key: string) => {
  const setItem = async (value: unknown) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch {
      console.log('Erro ao salvar os dados no Async Storage');
    }
  };

  const getItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch {
      console.log('Erro ao carregar os dados do Async Storage');
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      console.log('Erro ao remover os dados do Async Storage');
    }
  };

  return { setItem, getItem, removeItem };
};
