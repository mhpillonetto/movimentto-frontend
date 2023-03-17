import loginUser from '../../model/User/LoginUser'
import User from '../../model/User/User'
import { http_auth } from '../../providers'
import { getUserByUsername } from '../User/getUserByUsername'

type loginResponse = {
    accessToken: string
    refreshToken: string
}

export const login = async (loggingUser: loginUser) => {
    const { username, password } = loggingUser

    try {
        const { status, data } = await http_auth.post<loginResponse>(`/auth`, {
            user: username,
            pwd: password
        })

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        const foundUser: User = await getUserByUsername(username)

        localStorage.setItem("userName", foundUser.username)
        localStorage.setItem("userType", foundUser.userType)

    } catch (error) {
        throw new Error
    }

}