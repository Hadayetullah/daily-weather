import React from 'react'

const WeatherDetail = ({detailData, handleWeatherDetail}) => {
    console.log("Details: ",detailData)
  return (
    <div className='weather__detail'>
        <div className="weather__detail__background">
            <div className="weather__detail__header">Header</div>
            <div className="weather__detail__content">
            WeatherDetail
            </div>
        </div>
    </div>
  )
}

export default WeatherDetail