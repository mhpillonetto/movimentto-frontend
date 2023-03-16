import User from '../../model/User/User'
import { http_auth } from '../../providers'


export const createNewUser = async (newUser: User) => {
    const { username, password, email, userType } = newUser
    try {
        await http_auth.post<JSON>(`register`, {
            user: username,
            pwd: password,
            email,
            userType
        })

        localStorage.setItem("userType", userType)
        localStorage.setItem("userName", username)

    } catch (error) {
        throw new Error
    }
}