import Driver from "../model/Driver";
import http from '../providers'

export const editDriver = async (editedUser: Driver) => {
    console.log('====================================');
    console.log(editedUser);
    console.log('====================================');
    try {
        const { status, data } = await http.post('/user/edit', editedUser)
        
        return data
    } catch (error) {
        throw new Error
    }
}