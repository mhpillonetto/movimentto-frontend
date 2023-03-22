import { http } from "../../providers"

export const checkin = async (position) => {
    try {
        await http.post('/checkin', {
            username: localStorage.userName,
            lat: position.latitude,
            long: position.longitude
        })

    } catch (error) {
        throw new Error
    }
}