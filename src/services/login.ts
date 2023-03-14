import loginUser from '../model/LoginUser'
import http from '../providers'

type loginResponse = {
    accessToken: String
}

export const login = async (loggingUser: loginUser) => {
    const { username, password } = loggingUser

    const {status, data} = await http.post<loginResponse>(`/auth`, {
        user: username,
        pwd: password
    })

    if (status !== 200) throw new Error()
    
    // localStorage.setItem("jwt", data.token)

}