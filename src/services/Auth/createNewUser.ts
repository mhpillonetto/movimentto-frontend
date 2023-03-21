import User from '../../model/User/User'
import { http, http_auth } from '../../providers'
import { login } from './login'


export const createNewUser = async (newUser: User) => {
    const { username, password, email, userType } = newUser
    try {
        await http_auth.post(`register`, {
            user: username,
            pwd: password,
            email,
            userType
        })

        await login({username, password})
        localStorage.setItem("userType", userType)
        localStorage.setItem("userName", username)        
    } catch (error) {
        throw new Error
    }
}