import Transporter from "../../model/User/Transporter";
import Driver from "../../model/User/Driver";
import { http } from '../../providers'

export const editUser = async (user: Transporter | Driver) => {
    try {
        const { status, data } = await http.post('/user/edit', user)
        return data
    } catch (error) {
        throw new Error
    }
}