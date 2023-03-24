export default interface Shipment {
    title: string
    deliveryLocation: string
    deliveryDate: Date
    retrievalLocation: string
    retrievalDate: Date
    observations: string
    ownerUsername: string
    ownerDisplayName: string | null
    createdAt: Date
    price: number
    requiredVehicle: string
    product: string
    productType: string
    shipmentType: string
    weight: number
}