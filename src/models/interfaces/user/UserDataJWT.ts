export interface UserDataJWT {
  personId: number;
  type: string;
  isTrustedDevice: boolean;
  expirationDate: number;
  iat: number;
}
