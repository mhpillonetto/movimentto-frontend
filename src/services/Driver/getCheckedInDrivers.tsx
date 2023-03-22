import Driver from "../../model/User/Driver"
import { http } from "../../providers"

export const getCheckedInDrivers = async () => {
    try {
        return await http.get('/checkin')
    } catch (error) {
        throw new Error
    }
}