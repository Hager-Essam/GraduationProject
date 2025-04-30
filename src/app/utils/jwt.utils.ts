import {jwtDecode} from 'jwt-decode';


export interface DecodeedToken {
  email: string;
  nameid: string;
  role: string;
  exp: number;
  fullname:string;
}

export function decodeToken(token: string) {
  try {
    return jwtDecode<DecodeedToken>(token);
  } catch {
    return null;
  }
}
