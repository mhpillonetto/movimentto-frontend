export default interface Shipment {
    title: string
    deliveryLocation: string
    deliveryDate: Date
    retrievalLocation: string
    retrievalDate: Date
    ownerUsername: string
    ownerDisplayName: string | null
    createdAt: Date
    price: number
    requiredVehicle: string
    product: string
    productType: string
    complement: string
    weight: number
    tracking: string
    flooringType: string
    necessaryItems: string
}