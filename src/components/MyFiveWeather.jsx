import { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";

import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const MyFiveWeather = ({ lat, lon }) => {
  const [fiveDays, setFiveDays] = useState([]);
  //X STEFANO: queste fetch con ilmetodo async mi hanno salvato :)
  const fetchFiveDays = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=16bd8f0c31cbaaa77befa3637aa48930`;

    try {
      const resp = await fetch(URL);
      if (!resp.ok) {
        throw new Error("Errore nella chiamata");
      }
      const FiveWeather = await resp.json();
      console.log(FiveWeather);
      setFiveDays(FiveWeather.list);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFiveDays();
  }, []);

  console.log(fiveDays);
  return (
    <>
      <Row className="py-5">
        {/* {fiveDays.map((dayWeather) => {
          return (
            <>
              <Col xs={2}>
                <Card>
                  <Card.Img variant="top" src={`https://rodrigokamada.github.io/openweathermap/images/${dayWeather.weather.icon}_t.png`} />
                  <Card.Body>
                    <Card.Title>{dayWeather.main.temp - 273.15}</Card.Title>
                    <Card.Text>{dayWeather.weather.main}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              ;
            </>
          );
        })} */}
      </Row>
    </>
  );
};

export default MyFiveWeather;
