import Driver from '../model/Driver'
import http from '../providers'

export const getDriverByUsername = async (username: string): Promise<Driver>=> {

    const {status, data} = await http.get<Driver>(`/user`, {headers: {username}})
    
    if (status !== 200) {
        console.log("status error")   
        throw new Error()
    }

    return data
}