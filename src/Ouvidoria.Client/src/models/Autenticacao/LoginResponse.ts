import UserToken from "./UserToken";

export default interface ILoginResponse {
  accessToken: string;
  expiresIn: number;
  user: UserToken;
}
