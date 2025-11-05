import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./index.css";
import { useParams } from "react-router-dom";
import { shopList } from "../../api";

export default function Shops() {
  const { id } = useParams();

  const [shopData, setShopData] = useState([]);
  const [salonInfo,setSalonInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await shopList(id);
      console.log(data.salonData);
      if (data && data.salonData.length > 0) {
        setShopData(data.salonData);

        const { salon_name, logo, address } = data.salonData[0];
        setSalonInfo({ salon_name, logo, address });
      }
    };
    fetchData();
  }, [id]);

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
                        <>
                            <li>{services.name}</li>
                            <p>{services.price}</p>
                            <p>Rs.{services.duration_minutes}</p>
                        </>
                    ))}
                </ul>
                <input type='date'/>
                <input type='time'/>
                <button type='button'>Book slot</button>
            </div>
        </div>
      </div>
    </>
  );
}
