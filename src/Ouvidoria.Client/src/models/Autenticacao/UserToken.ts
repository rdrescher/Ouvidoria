import Claim from "./Claim";

export default interface IUserToken {
    id: number;
    email: string;
    claims: Claim[];
}