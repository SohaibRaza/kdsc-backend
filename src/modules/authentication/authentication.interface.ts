import { User } from "~src/db"

export interface IAuthResponse {
  user: User
  searchAPIToken: string
  jwtToken?: string
  requestUsername?: boolean
}

export interface IUsernameResponse {
  available: boolean
}
