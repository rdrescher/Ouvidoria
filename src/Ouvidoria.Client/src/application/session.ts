import Claim from "../models/Autenticacao/Claim";
import LoginResponse from "../models/Autenticacao/LoginResponse";
import UserToken from "../models/Autenticacao/UserToken";
import JwtParser from "./jwtParser";

export const getToken = (): string => localStorage.getItem("token") || "";

export const getUser = (): UserToken | null => {
  let user = localStorage.getItem("user");
  if (user == null) return null;
  else return JSON.parse(user);
};

export const getClaims = (): Claim[] => {
  let token = getToken();
  if (!token) return [];
  return refreshClaims(token);
};

export const isAuthenticated = (): boolean => !!getToken();

export function login(login: LoginResponse): void {
  setToken(login.accessToken);
  setExpirationTime(login.expiresIn);
  setUser(login.user);
}

export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("expiresIn");
}

function setToken(token: string): void {
  localStorage.setItem("token", token);
}

function setUser(user: UserToken): void {
  localStorage.setItem("user", JSON.stringify(user));
}

function setExpirationTime(time: number): void {
  localStorage.setItem("expiresIn", time.toString());
}

function refreshClaims(token: string): Claim[] {
  let obj = JwtParser.parseJwt(token);
  let claims: Claim[] = [];
  for (let key in obj) {
    claims.push({ type: key, value: obj[key] });
  }
  return claims;
}
