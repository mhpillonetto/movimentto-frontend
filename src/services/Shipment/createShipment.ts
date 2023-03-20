import Shipment from "../../model/Shipment/Shipment"
import { http } from "../../providers"

export const createShipment = async (newShipment: Shipment) => {
    const { status, data } = await http.post(`/shipment`, newShipment)

    if (status !== 201) {
        console.log("status error")
        throw new Error()
    }
    
    return data
}