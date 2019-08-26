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

export const isAuthenticated = (): boolean => getToken() !== "";

export function refreshUserClaims(): void {
  let userStore = localStorage.getItem("user");
  let token = getToken();
  if (userStore === null) return;
  if (token === null) return;

  let user = JSON.parse(userStore) as UserToken;
  let claims = JwtParser.parseJwt(token) as Claim[];
  user.claims = claims;

  setUser(user);
}

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
