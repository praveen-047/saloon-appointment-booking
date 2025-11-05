import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { shopList,bookAppointment } from "../../api";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'

export default function Shops() {

  const navigate =useNavigate();


  const { id } = useParams();

  const [shopData, setShopData] = useState([]);
  const [salonInfo,setSalonInfo] = useState({});

  const[userId,setUserId] = useState("");
  const[selectedServices,setSelectedServices] = useState([]);
  const[date,setDate] = useState("")
  const[time,setTime] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await shopList(id);
      if (data && data.salonData.length > 0) {
        const payload = jwtDecode(Cookies.get("jwt_token"))
        setUserId(payload.user_id)
        setShopData(data.salonData);

        const { salon_id,salon_name, logo, address } = data.salonData[0];
        setSalonInfo({ salon_id,salon_name, logo, address });
      }
    };
    fetchData();
  }, [id]);


  const handleServiceSelect = (serviceId)=>{
    setSelectedServices((prev)=>
      prev.includes(serviceId) 
    ? prev.filter((id)=> id!==serviceId)
    :[...prev,serviceId]
    )
  }

  const handleBooking = async()=>{
    if(selectedServices.length===0 || !date || !time){
      alert("select service,date,time")
      return;
    }
    const bookingData = {
      user_id:userId,
      salon_id:salonInfo.salon_id,
      service_ids:selectedServices,
      appointment_date:date,
      appointment_time:time,
      status:"confirmed"
    }
    const data = await bookAppointment(bookingData,Cookies.get("jwt_token"));
    alert("Appointment booked successfully")
    navigate("/")
  }



  return (
    <>
      <Header />
      <div className="shop-container">
        <div className="shop-container-1">
            <div className="shop-card-header">
              <h1>{salonInfo.salon_name}</h1>
              <img src={salonInfo.logo} alt='logo'/>
            </div>
            <div className="shop-card-services">
                <h1>Our Services</h1>
                <ul>
                    {shopData.map((services)=>(
                        <li key={services.service_id}>
                            <p>{services.name}</p>
                            <p>Rs{services.price}</p>
                            <p>{services.duration_minutes}min</p>
                            <input type="checkbox" checked={selectedServices.includes(services.service_id)} onChange={()=>{handleServiceSelect(services.service_id)}}/>
                        </li>
                    ))}
                </ul>
                <input type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                <input type='time' value={time} onChange={(e)=>setTime(e.target.value)}/>
                <button type='button' onClick={handleBooking}>Book slot</button>
            </div>
        </div>
      </div>
    </>
  );
}
