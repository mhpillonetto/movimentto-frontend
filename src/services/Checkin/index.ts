import { http } from "../../providers"

export const checkin = async (position, location, status) => {
    try {
        await http.post('/checkin', {
            username: localStorage.userName,
            lat: position.latitude,
            long: position.longitude,
            city: location.city,
            state: location.state,
            status
        })

    } catch (error) {
        throw new Error
    }
}