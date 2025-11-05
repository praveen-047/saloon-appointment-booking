

import Header from '../../components/Header'
import './index.css'

export default function Profile(){

    return(
        <>
            <Header/>
            <div className='profile-container'>
                <div className='profile-header-options'>
                    <p>My Bookings</p>
                    <p></p>
                </div>
            </div>
        </>
    )
}