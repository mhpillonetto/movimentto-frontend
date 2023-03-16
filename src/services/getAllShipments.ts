import { http } from '../providers'

export const getAllShipments = async () => {

    const { status, data } = await http.get(`/shipment`)

    if (status !== 200) {
        console.log("status error")
        throw new Error()
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    return data
}