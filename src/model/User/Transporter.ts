import User from "./User"

export default interface Transporter extends User {
    username: string
    displayName: string
    email: string
    cnpj: string
    contactName: string
    website: string
    cep: string
    address: string
}