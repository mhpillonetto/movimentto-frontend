import { http_auth } from "../../providers"

export const logout = () => {
    localStorage.setItem("jwt", "")

    try {
        http_auth.get<JSON>(`/logout`)
    } catch (error) {
        console.log(error)
        throw new Error
    }
}