import Transporter from "../model/Transporter";
import http from '../providers'

export const editUser = async (user: Transporter) => {

    try {
        const { status, data } = await http.post('/user/edit', {user})
        return data
    } catch (error) {
        throw new Error
    }
}