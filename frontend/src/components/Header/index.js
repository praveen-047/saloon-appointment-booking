import { useContext,useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'

import { CgProfile } from "react-icons/cg";

import './index.css'
function Header() {

    const[username,setUsername] = useState("");

    useEffect(()=>{
        try{
            const token = Cookies.get("jwt_token")
            if (!token) return;

            const payload = jwtDecode(token)

            setUsername(payload.username)
        }catch(error){
            console.log("invalid token",error)
            setUsername('')
        }
    },[])

    const{setSearchTerm,setLocation} = useContext(SearchContext);

    const handleSearch = (e)=>setSearchTerm(e.target.value)
    

    return (
        <nav className="navbar">
            <img className="nav-logo" src='https://tinyurl.com/443hwhjm' alt='logo'/>
            <input type='search' placeholder="Search your saloon" onChange={handleSearch}/>
            <select >
                <option value="">Select Location</option>
                <option value='BTM layout'>BTM layout</option>
                <option value='Rajajinagar'>Rajajinagar</option>
                <option value='Bommnahalli'>Bommnahalli</option>
                <option value='JP nagar'>JP nagar</option>
            </select>
            <p>{username}</p>
            <CgProfile />
        </nav>
    );
}

export default Header;
