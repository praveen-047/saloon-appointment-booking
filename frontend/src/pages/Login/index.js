import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {login} from '../../api'
import Cookies from 'js-cookie'
import "./index.css";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg,setError] = useState('')

  const navigate = useNavigate();

  const loginSuccess = (token)=>{
    Cookies.set('jwt_token',token,{expires:30});
    navigate('/')
  }


  const loginFailure = (error)=>{
    setError(error)
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
        const res = await login(email,password)
        const data = await res.json()
        if(res.ok){
          loginSuccess(data.token)
        }
        else{
          loginFailure(data.msg)
        }
    }catch(error){
        console.log("login error ",error)
    }
  }

  const onClickRegister = ()=>{
    navigate('/register',{replace:true})
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <div onClick={onClickRegister}>
          <p>Don't have a account? register here</p>
        </div>

        <p>{errorMsg}</p>
        
      </form>
    </div>
  );
};
