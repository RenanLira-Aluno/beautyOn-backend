export interface UserPayload {
    sub: string
    email: string
    tipo: string
    iat?: number
    exp?: number
}