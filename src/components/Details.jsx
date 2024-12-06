import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const Details = () => {
  const params = useParams();
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
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
  const [fiveDays, setFiveDays] = useState([]);

  const fetchGeocoder = () => {
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${params.id}&limit=1&appid=275b1f37b9f0dd4aa5518ab57aada5e7
`;
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((city) => {
        setLat(city.lat);
        setLon(city.lon);
      });
  };

  const fetchCurrentWeather = () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=275b1f37b9f0dd4aa5518ab57aada5e7`;
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((onTimeWeather) => {
        setCurrentWeather(onTimeWeather.weather.main);
        setCurrentDescription(onTimeWeather.weather.description);
        setIdImg(onTimeWeather.weather.icon);
        setCurrentTemperature(onTimeWeather.main.temp);
        setMinTemperature(onTimeWeather.main.temp_min);
        setMaxTemperature(onTimeWeather.main.temp_max);
        setFeelsLikeTemperature(onTimeWeather.main.feels_like);
        setWindSpeed(onTimeWeather.wind.speed);
        setCurrentTime(onTimeWeather.dt);
        setCurrentHumidity(onTimeWeather.main.humidity);
        //CONVERSIONI
        setCurrentTemperature({ currentTemperature } - 273.15);
        setWindSpeed({ windSpeed } * 3.6);
      });
  };

  const fetchFiveDays = () => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}}&lon=${lon}&appid=275b1f37b9f0dd4aa5518ab57aada5e7`;
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((FiveWeather) => {
        setFiveDays(FiveWeather.list);
      });
  };

  const timestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      weekday: "long",
    });
    setCurrentTime(formattedDate);
  };

  useEffect(() => {
    fetchGeocoder();
    fetchCurrentWeather();
    fetchFiveDays();
    timestampToDate(currentTime);
  }, []);

  return (
    <>
      <Container fluid className="d-flex flex-column bg-home py-5">
        <Row className=" justify-content-center align-items-center py-5">
          <Col xs={3} className=" ">
            <h2 className="fs-2 text-white fw-bold">{params.id}</h2>
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
        <Row className="py-5">
          {fiveDays.map((dayWeather) => {
            <Col xs={2}>
              <Card>
                <Card.Img variant="top" src={`https://rodrigokamada.github.io/openweathermap/images/${dayWeather.weather.icon}_t.png`} />
                <Card.Body>
                  <Card.Title>{dayWeather.main.temp - 273.15}</Card.Title>
                  <Card.Text>{dayWeather.weather.main}</Card.Text>
                </Card.Body>
              </Card>
            </Col>;
          })}
        </Row>
      </Container>
    </>
  );
};

export default Details;
