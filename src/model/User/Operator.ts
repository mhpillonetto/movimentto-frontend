import User from "./User"

export default interface Operator extends User {
    displayName: string
    email: string
    cpf: string
    licensePlate: string
    firstComplementLicensePlate: string
    secondComplementLicensePlate: string
    vehicleType: string
    lastCheckIn: Date
    lat: number
    long: number
    cep: string
    address: string
    antt: string
}