import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register} from '../../api'

import "./index.css";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate()


  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
        await register(user)
        navigate('/login',{replace:true})
        
    } catch (error) {
        console.log("register error :",error);
        
    }
  };

  const onClickLogin = ()=>{
    navigate('/login',{replace:true})
  }

  return (
    <div id="forms">
      <form onSubmit={handleRegister}>
        <div className="heading">
          <h2>SignUp</h2>
        </div>

        <div className="outerdiv">
          <div className="innerdiv">
            <label htmlFor="">Username </label>
            <input type="text" className="form-elements" name="username" value={user.username} onChange={handleChanges}/>
          </div>

          <div className="innerdiv">
            <label htmlFor="">Email </label>
            <input type="text" className="form-elements" name="email" value={user.email} onChange={handleChanges}/>
          </div>

          <div className="innerdiv">
            <label htmlFor="">Mobile Number</label>
            <input type="text" className="form-elements" name="mobile" value={user.mobile} onChange={handleChanges}/>
          </div>

          <div className="innerdiv">
            <label htmlFor="">Password </label>
            <input type="text" className="form-elements" name="password" value={user.password} onChange={handleChanges}/>
          </div>

          <div className="innerdiv">
            <label htmlFor="">Confirm Password </label>
            <input type="text" className="form-elements" name="confirmPassword" value={user.confirmPassword} onChange={handleChanges}/>
          </div>
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>

        <div onClick={onClickLogin}>
          <p>Don't have a account? register here</p>
        </div>
      </form>
    </div>
  );
}
