import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: any; // In case the token has other fields
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (err) {
    return true;
  }
};

export const getTokenExpiryTime = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000;
  } catch (err) {
    return null;
  }
};
