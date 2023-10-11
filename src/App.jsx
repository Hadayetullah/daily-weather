import { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherDetail from './WeatherDetail';
import './App.css'

function App() {
  const API_KEY = "dc807ae661f2515cab64b72c530cb415";

  const latitudeLongitude = [
    // Division
    // { city: 'dhaka', coords: 'lat=23.9536&lon=90.1495'},
    // { city: 'rajshahi', coords: 'lat=24.7106&lon=88.9414'},
    // { city: 'rangpur', coords: 'lat=25.8483&lon=88.9414'},
    // { city: 'mymensingh', coords: 'lat=24.7136&lon=90.4502'},
    // { city: 'sylhet', coords: 'lat=24.70506&lon=91.6761'},
    // { city: 'barisal', coords: 'lat=22.3811&lon=90.3372'},
    // { city: 'chattogram', coords: 'lat=23.1793&lon=91.9882'},
    // { city: 'khulna', coords: 'lat=22.8088&lon=89.2467'},

    // District
    { district: 'dhaka', coords: 'lat=23.8105&lon=90.3372'},
    { district: 'faridpur', coords: 'lat=23.5424&lon=89.6309'},
    { district: 'gazipur', coords: 'lat=23.9905&lon=90.3877'},
    { district: 'gopalganj', coords: 'lat=23.0488&lon=89.8879'},
    { district: 'kishoreganj', coords: 'lat=24.4260&lon=90.9821'},
    { district: 'madaripur', coords: 'lat=23.2393&lon=90.1870'},
    { district: 'manikganj', coords: 'lat=23.8617&lon=90.0003'},
    { district: 'narayanganj', coords: 'lat=23.6429&lon=90.4883'},
    { district: 'narsingdi', coords: 'lat=24.1344&lon=90.7860'},
    { district: 'rajbari', coords: 'lat=23.7151&lon=89.5875'},
    { district: 'shariatpur', coords: 'lat=23.2423&lon=90.4348'},
    { district: 'tangail', coords: 'lat=24.3917&lon=89.9948'},

    // City
    // { city: 'khilkhet', coords: 'lat=23.8311&lon=90.4243'},
    // { city: 'mirpur', coords: 'lat=23.8223&lon=90.3654'},
    // { city: 'khulna', coords: 'lat=22.6738&lon=89.3967'},
  ];

  const districtNames = {
    "Dhaka District": "Dhaka",
    "Tāngāil": "Tangail",
    "Pālang": "shariatpur",
    "Srīpur": "rajbari",
    "Bājitpur": "narsingdi",
    "Nārāyanganj": "narayanganj",
    "Mānikganj": "manikganj",
    "Mādārīpur": "madaripur",
    "Kishorganj": "Kishorganj",
    "Tungipāra": "gopalganj",
    "Tongi": "gazipur",
    "Farīdpur": "faridpur"
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
  function reloadApp() {
    window.location.reload();
  }
  

  // console.log(data)

  return (
    <>
      <div className="container">
        <div className="weather">
          <h5>Daily weather of different districts of Dhaka Division</h5>
          <button onClick={reloadApp} className='refresh__button'>Refresh</button>
          <div className='weather__table'>
              {
                  data.map((state, i) => {
                    let stName = state.name;
                      return (
                          <button onClick={()=>handleWeatherDetail(i)} className='individual__state' key={i}>
                              <div className="individual__state__left">
                                <p>{ districtNames[stName] }</p>
                              </div>

                              <div className="individual__state__right">
                                <div className='individual__state__icon'>
                                  <img src={`https://openweathermap.org/img/wn/${state.weather[0].icon}@2x.png`} alt="Weather Icon" />
                                </div>

                                <div className='individual__state__temp'>
                                  <p>{ Math.ceil(state.main.temp - 273.15) }<sup>o</sup></p>
                                </div>
                              </div>
                          </button>
                      )
                  })
              }
          </div>
        </div>

        {
          weatherDetail != null ? <WeatherDetail districtNames={districtNames} detailData={data[weatherDetail]} handleWeatherDetail={handleWeatherDetail} /> : <div></div>
        }
      </div>
    </>
  )
}

export default App
