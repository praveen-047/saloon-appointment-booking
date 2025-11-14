import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/index.js";
import "./index.css";
import { SearchContext } from "../../context/SearchContext.js";
import { home } from "../../api.js";
import { Link } from "react-router-dom";

export default function Home() {
  const { searchTerm, location } = useContext(SearchContext);
  const [saloonsData, setSaloonsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await home();
      if (data && data.shopsList) {
        setSaloonsData(data.shopsList);
      } else {
        setSaloonsData([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-container-1">
          {console.log(saloonsData)}
          <div className="shops-list">
            {saloonsData.map((shop) => (
              <div className="shop-card" key={shop.salon_id}>
                <img src={shop.image_url} alt="shop logo" />
                <h1>{shop.name}</h1>
                <p>{shop.address}</p>
                <p>Phone : {shop.phone}</p>
                <Link to={`/saloon/${shop.salon_id}`}>
                  <button>View details</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
