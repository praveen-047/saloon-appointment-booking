

import { useEffect, useState } from 'react'
import {profile} from '../../api.js'
import Header from '../../components/Header'
import './index.css'

export default function Profile(){

    const[bookingsData,setBookingsData] = useState([])
    const[activeTab,setActiveTab] = useState('')
    
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await profile();
            if(data && data.bookings){
                setBookingsData(data.bookings)
            }
            else{
                setBookingsData([])
            }

        }
        fetchData();
    },[])

    return(
        <>
            <Header/>
            <div className='profile-container'>
                <div className='profile-header-options'>
                    <p className={activeTab === "bookings" ? "active" : ""} onClick={()=>setActiveTab("bookings")}>My Bookings</p>
                    <p className={activeTab === "profile" ? "active" : ""} onClick={()=>setActiveTab("profile")}>Profile Edit</p>
                </div>
                <div className={activeTab === "bookings" ? "profile-bookings-card" : "display-none"}>
                    {bookingsData.map((each)=>(
                        <div key={each.saloon_name}>
                            <img src={each.logo}/>
                            <h1>{each.saloon_name}</h1>
                            <p>{each.address}</p>
                            <h1>Appointment</h1>
                            <p>{each.appointment_date}</p>
                            <p>{each.appointment_time}</p>

                            <h1>Booked service</h1>
                            <p>{each.service_name} ({each.duration}min)------Rs{each.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}