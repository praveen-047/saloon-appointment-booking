import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoute({children}){
    const jwtToken = Cookies.get("jwt_token")

    if(!jwtToken){
        return <Navigate to='/login' replace/>
    }
    return children
}