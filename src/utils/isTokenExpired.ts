import { jwtDecode } from "jwt-decode"

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    const currentTime = Date.now() / 1000  // convert to seconds

    return decoded.exp < currentTime  // true = expired
  } catch {
    return true  // if can't decode → treat as expired
  }
}