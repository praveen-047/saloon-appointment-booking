const api_url = 'http://localhost:5000'

export async function login(email,password){
    const url = `${api_url}/auth/login`
    const options = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    }
    const res = await fetch(url,options)

    return res.json();
}