import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const WeatherDetail = ({districtNames, detailData, handleWeatherDetail}) => {
    // console.log("Details: ",detailData)
    // console.log("Cities: ",districtNames)
    let stName = detailData.name;
  return (
    <div className='weather__detail'>
        <div className="weather__detail__overflow">
            <div className="weather__detail__background">
                <div className="weather__detail__header">
                    <div className="weather__detail__header__content">
                        <h5>Weather Details of { districtNames[stName] } City</h5>
                    </div>
                    <div className="weather__detail__header__icon">
                        <FontAwesomeIcon icon={faXmark} onClick={()=> handleWeatherDetail(null)} />
                    </div>
                </div>
                <hr />
                <div className="weather__detail__content">
                    <div className="weather__detail__contents__top">
                        <div className="weather__detail__contents__top__left">
                            <div className="weather__detail__contents__top__icon">
                                <img src={`https://openweathermap.org/img/wn/${detailData.weather[0].icon}@4x.png`} alt="Weather Icon" />
                            </div>

                            <div className="weather__detail__contents__top__sky">
                                <p>{ detailData.weather[0].main }</p>
                            </div>
                        </div>
                        
                        <div className="weather__detail__contents__top__right">
                            <div className="weather__detail__contents__top__temp">
                                <div className="weather__detail__contents__top__temp__text">
                                    <p>{ Math.ceil(detailData.main.temp - 273.15) }</p>
                                </div>
                                <div className="weather__unit__icons">
                                <p style={{
                                    fontSize: "30px",
                                    fontWeight: "bolder"
                                }}>o</p>
                                    <p style={{
                                        fontSize: "40px",
                                        fontWeight: "normal"
                                    }}>c</p>
                                </div>
                            </div>

                            <div className="weather__detail__contents__top__feel">
                                <p style={{paddingRight: "10px"}}>Real Feel<sup>*</sup></p>
                                <p>{ Math.ceil(detailData.main.feels_like - 273.15) }<sup>o</sup></p>
                            </div>
                        </div>
                    </div>

                    <div className="weather__detail__contents__bottom">
                        <div className="weather__detail__contents">
                            <p>Current Temperature</p>
                            <div><p>{ Math.ceil(detailData.main.temp - 273.15) }<sup>o</sup></p></div>
                        </div>
                        
                        <div className="weather__detail__contents">
                            <p>Humidity</p>
                            <div><p>{ Math.ceil(detailData.main.humidity) }%</p></div>
                        </div>

                        <div className="weather__detail__contents">
                            <p>Feel Like</p>
                            <div><p>{ Math.ceil(detailData.main.feels_like - 273.15) }<sup>o</sup></p></div>
                        </div>

                        <div className="weather__detail__contents">
                            <p>Weather Condition</p>
                            <div><p>{ detailData.weather[0].description }</p></div>
                        </div>

                        <div className="weather__detail__contents">
                            <p>Sea Level</p>
                            <div><p>{ (((detailData.main.pressure) * 0.0145038) / 100).toFixed(3) }psi</p></div>
                        </div>

                        <div className="weather__detail__contents">
                            <p>Maximum Temperature</p>
                            <div><p>{ Math.ceil(detailData.main.temp_max - 273.15) }<sup>o</sup></p></div>
                        </div>

                        <div className="weather__detail__contents">
                            <p>Minimum Temperature</p>
                            <div><p>{ Math.ceil(detailData.main.temp_min - 273.15) }<sup>o</sup></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherDetail