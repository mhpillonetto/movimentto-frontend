export default interface Shipment {
    title: string
    deliveryLocation: string
    deliveryDate: Date
    retrievalLocation: string
    retrievalDate: Date
    observations: string
    owner: string
    createdAt: Date
    price: number
    requiredVehicle: string
}