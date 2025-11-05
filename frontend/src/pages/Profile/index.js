

import { useEffect, useState } from 'react'
import {profile} from '../../api.js'
import Header from '../../components/Header'
import './index.css'

export default function Profile(){

    const[bookingsData,setBookingsData] = useState([])
    
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
                    <p>My Bookings</p>
                    <p>Profile Edit</p>
                </div>
                <div className='profile-bookings-card'>
                    {bookingsData.map((each)=>(
                        <div key={each.saloon_name}>
                            <img src={each.logo}/>
                            <h1>{each.saloon_name}</h1>
                            <p>{each.address}</p>
                            <h1>Appointments</h1>
                            <p>{each.appointment_date}</p>
                            <p>{each.appointment_time}</p>

                            <h1>Booked service</h1>
                            <p>{each.service_name}({each.duration})------{each.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}