import Cookies from 'js-cookie'

const api_url = 'http://localhost:5000'

export async function login(email,password){
    const url = `${api_url}/auth/login`
    const options = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    }
    const res = await fetch(url,options)

    return res
}

export async function register(user){
    const url = `${api_url}/auth/register`

    const options = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(user)
    }

    const res = await fetch(url,options)
    return res.json();
}

export async function home(){
    const url = `${api_url}/route/home`

    const token = Cookies.get("jwt_token")

    const options = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    }

    const res = await fetch(url,options)
    const data = await res.json()
    return data
}