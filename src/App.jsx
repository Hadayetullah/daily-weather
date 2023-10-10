import { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherDetail from './WeatherDetail';
import './App.css'

function App() {
  const API_KEY = "dc807ae661f2515cab64b72c530cb415";

  const latitudeLongitude = [
    { city: 'dhaka', coords: 'lat=23.9536&lon=90.1495'},
    { city: 'rajshahi', coords: 'lat=24.7106&lon=88.9414'},
    { city: 'rangpur', coords: 'lat=25.8483&lon=88.9414'},
    { city: 'mymensingh', coords: 'lat=24.7136&lon=90.4502'},
    { city: 'sylhet', coords: 'lat=24.70506&lon=91.6761'},
    { city: 'barisal', coords: 'lat=22.3811&lon=90.3372'},
    { city: 'chattogram', coords: 'lat=23.1793&lon=91.9882'},
    { city: 'khulna', coords: 'lat=22.8088&lon=89.2467'},
    // { city: 'khulna', coords: 'lat=22.6738&lon=89.3967'},
  ];

  const stateNames = {
    "Bangladesh": "Dhaka",
    "Rangpur Division": "Rangpur",
    "Pār Naogaon": "Rajshahi",
    "Mymensingh": "Mymensingh",
    "Sylhet Division": "Sylhet",
    "Barisal Division": "Barisal",
    "Khagrachhari": "Chattogram",
    "Khulna Division": "Khulna"
  }
  
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weatherDetail, setWeatherDetail] = useState(null);

    

  useEffect(() => {
    const fetchData = async () => {
      if (currentIndex < latitudeLongitude.length) {
        const location = latitudeLongitude[currentIndex];

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?${location.coords}&appid=${API_KEY}`
          );

          setData((prevData) => [...prevData, response.data]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }

        setCurrentIndex((prevIndex) => prevIndex + 1);
      } 
    };

    
    fetchData();
  }, [currentIndex]);


  const handleWeatherDetail = (value) => {
    setWeatherDetail(value);
  }

  console.log(data)

  return (
    <>
      <div className="container">
        <div className="weather">
          <h5>Daily weather of different states in Bangladesh</h5>
          <div className='weather__table'>
              {
                  data.map((state, i) => {
                    let stName = state.name;
                      return (
                          <button onClick={()=>handleWeatherDetail(i)} className='individual__state' key={i}>
                              <p>{ stateNames[stName] }</p>
                              <p>{ Math.ceil(state.main.temp - 273.15) }<sup>o</sup></p>
                          </button>
                      )
                  })
              }
          </div>
        </div>

        {
          weatherDetail != null ? <WeatherDetail detailData={data[weatherDetail]} handleWeatherDetail={handleWeatherDetail} /> : <div></div>
        }
      </div>
    </>
  )
}

export default App
