import Transporter from '../model/Transporter'
import http from '../providers'

export const getTransporterByUsername = async (username: string): Promise<Transporter>=> {

    const {status, data} = await http.get<Transporter>(`/user`, {headers: {username}})
    
    if (status !== 200) {
        console.log("status error")   
        throw new Error()
    }

    return data
}