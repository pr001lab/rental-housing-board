const AUTN_TOKEN_NAME = 'six-cities';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTN_TOKEN_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTN_TOKEN_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTN_TOKEN_NAME);
};
