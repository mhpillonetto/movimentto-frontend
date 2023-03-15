import User from '../model/User'
import http from '../providers'

export const getUserByUsername = async (username: string): Promise<User>=> {

    const {status, data} = await http.get<User>(`/user`, {headers: {username}})
    
    if (status !== 200) {
        console.log("status error")   
        throw new Error()
    }

    return data
}