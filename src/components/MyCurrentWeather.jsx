import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const MyCurrentWeather = (props) => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentTemperature, setCurrentTemperature] = useState();
  const [currentHumidity, setCurrentHumidity] = useState();
  const [feelsLikeTemperature, setFeelsLikeTemperature] = useState();
  const [minTemperature, setMinTemperature] = useState();
  const [maxTemperature, setMaxTemperature] = useState();
  const [idImg, setIdImg] = useState("");
  const [windSpeed, setWindSpeed] = useState();
  const [currentTime, setCurrentTime] = useState();
  const fetchCurrentWeather = () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=16bd8f0c31cbaaa77befa3637aa48930`;
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((onTimeWeather) => {
        const tempInCelsius = (onTimeWeather.main.temp - 273.15).toFixed(1);
        const minTempInCelsius = (onTimeWeather.main.temp_min - 273.15).toFixed(1);
        const maxTempInCelsius = (onTimeWeather.main.temp_max - 273.15).toFixed(1);
        const windSpeedInKmh = (onTimeWeather.wind.speed * 3.6).toFixed(1);
        setCurrentWeather(onTimeWeather.weather[0].main);
        setCurrentDescription(onTimeWeather.weather[0].description);
        setIdImg(onTimeWeather.weather[0].icon);
        setCurrentTemperature(parseFloat(tempInCelsius));
        setMinTemperature(parseFloat(minTempInCelsius));
        setMaxTemperature(parseFloat(maxTempInCelsius));
        setFeelsLikeTemperature((onTimeWeather.main.feels_like - 273.15).toFixed(1));
        setWindSpeed(parseFloat(windSpeedInKmh));
        setCurrentTime(onTimeWeather.dt);
        setCurrentHumidity(onTimeWeather.main.humidity);

        const timestampToDate = (timestamp) => {
          const date = new Date(timestamp * 1000);

          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            weekday: "long",
          });

          return formattedDate;
        };

        const formattedDate = timestampToDate(onTimeWeather.dt);
        setCurrentTime(formattedDate);
      })

      .catch((error) => {
        console.log("Errore nella fetch:", error);
      });
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, [props.lat, props.lon]);
  return (
    <>
      <Row className=" justify-content-center align-items-center py-5">
        <Col xs={3} className=" ">
          <h2 className="fs-2 text-white fw-bold">{props.city}</h2>
          <p className="m-0 fs-4 text-white">{currentTime}</p>
          <img src={`https://rodrigokamada.github.io/openweathermap/images/${idImg}_t@4x.png`} alt="" />
        </Col>
        <Col xs={3} className="">
          <div className="d-flex flex-column justify-content-start">
            <div className="d-flex justify-content-between pb-4">
              <p className="m-0 fs-2 text-white">{currentTemperature}°C</p>
              <p className="m-0 fs-3 text-white">{currentWeather}</p>
            </div>
            <p className="m-0 fs-2 text-white pb-4">{currentDescription}</p>
            <div className="d-flex justify-content-between pb-4">
              <p className="m-0 fs-4 text-white">Min: {minTemperature}°C</p>
              <p className="m-0 fs-4 text-white">Perceived: {feelsLikeTemperature}°C</p>
              <p className="m-0 fs-4 text-white">Max: {maxTemperature}°C</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0  fs-2 text-white">
                <FaWind className="me-2" />
                {windSpeed}km/h
              </p>
              <p className="m-0 fs-2 text-white">
                <WiHumidity className="me-2" />
                {currentHumidity}%
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MyCurrentWeather;
