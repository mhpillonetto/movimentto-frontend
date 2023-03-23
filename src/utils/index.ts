//small general functions
//pure functions
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { logout } from "../services/Auth/logout"

export const handleUserLoggedOut = async (user) => {
    const navigate = useNavigate()
    if (!user) {
        await logout()
        localStorage.clear()
        navigate('/inicio', { replace: true })
    }
}

