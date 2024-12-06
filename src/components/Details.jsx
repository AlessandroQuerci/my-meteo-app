import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import MyCurrentWeather from "./MyCurrentWeather";
import MyFiveWeather from "./MyFiveWeather";

const Details = () => {
  const params = useParams();
  console.log(params);
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();

  const fetchGeocoder = () => {
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${params.id}&limit=1&appid=16bd8f0c31cbaaa77befa3637aa48930
`;
    fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((city) => {
        console.log(city);
        setLat(city[0].lat);
        setLon(city[0].lon);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  useEffect(() => {
    fetchGeocoder();
  }, [params.id]);

  if (lon === undefined || lat === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container fluid className="d-flex flex-column bg-home py-5">
        <MyCurrentWeather lon={lon} lat={lat} city={params.id} />
        <MyFiveWeather lon={lon} lat={lat} city={params.id} />
      </Container>
    </>
  );
};

export default Details;
