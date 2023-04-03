import User from "./User"

export default interface Driver extends User {
    displayName: string
    cpf: string
    phoneNumber: string
    licensePlate: string
    firstComplementLicensePlate: string
    secondComplementLicensePlate: string
    vehicleType: string
    lastCheckIn: Date
    lat: number
    long: number
    city: string
    state: string
    status: string
}