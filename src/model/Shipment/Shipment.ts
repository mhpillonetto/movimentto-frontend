export default interface Shipment {
    title: string
    deliveryLocation: string
    deliveryDate: Date
    retrievalLocation: string
    retrievalDate: Date
    observations: string
    owner: string | null
    createdAt: Date
    price: number
    requiredVehicle: string
    product: string
    productType: string
    shipmentType: string
    weight: number
}