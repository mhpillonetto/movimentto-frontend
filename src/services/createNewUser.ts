import User from '../model/User'
import http from '../providers'


export const createNewUser = (newUser: User) => {
    const { username, password, email, userType } = newUser

    http.post<JSON>(`register`, {
        user: username,
        pwd: password,
        email,
        userType
    })
        .then(function (response) {
            localStorage.store("userType", userType)
            return response
        })
        .catch(function (error) {
            console.log(error)
            throw new Error(error)
        })
}