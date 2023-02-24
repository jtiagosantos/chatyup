const randomNumberBetweenZeroAndTen = () => (Math.random() * 10).toFixed(0);

export const generateRoomCode = (length: number = 10) => {
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomNumber = randomNumberBetweenZeroAndTen();
    code = `${code}${randomNumber}`;
  }

  return code;
};
