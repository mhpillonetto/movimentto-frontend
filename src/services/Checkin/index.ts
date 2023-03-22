import { http } from "../../providers"

export const checkin = async (position, location) => {
    try {
        await http.post('/checkin', {
            username: localStorage.userName,
            lat: position.latitude,
            long: position.longitude,
            city: location.city,
            state: location.state
        })

    } catch (error) {
        throw new Error
    }
}