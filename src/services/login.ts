import loginUser from '../model/LoginUser'
import http from '../providers'
import { getUserByUsername } from './getUserByUsername'

type loginResponse = {
    accessToken: string
}

export const login = async (loggingUser: loginUser) => {
    const { username, password } = loggingUser

    const {status, data} = await http.post<loginResponse>(`/auth`, {
        user: username,
        pwd: password
    })

    if (status !== 200) throw new Error()
    
    localStorage.setItem("jwt", data.accessToken)

    const userType = await getUserByUsername(username)
    localStorage.setItem("userType", userType)

}