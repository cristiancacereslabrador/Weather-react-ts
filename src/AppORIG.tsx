import { useEffect, useState } from "react";
import styled from "styled-components";
import w0 from "../src/img/w0.jpg";
import w1 from "../src/img/w1.jpg";
import w2 from "../src/img/w2.jpg";
import w3 from "../src/img/w3.jpg";
import w4 from "../src/img/w4.jpg";
import w5 from "../src/img/w5.jpg";
import w6 from "../src/img/w6.jpg";
import w7 from "../src/img/w7.jpg";
import w8 from "../src/img/w8.jpg";
import w9 from "../src/img/w9.jpg";
import w10 from "../src/img/w10.jpg";
import w11 from "../src/img/w11.jpg";
import w12 from "../src/img/w12.jpg";
import w13 from "../src/img/w13.jpg";
import w14 from "../src/img/w14.jpg";
import w15 from "../src/img/w15.jpg";
import w16 from "../src/img/w16.jpg";
import w17 from "../src/img/w17.jpg";
import w18 from "../src/img/w18.jpg";
import w19 from "../src/img/w19.jpg";
import w20 from "../src/img/w20.jpg";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from "./hooks/useWeather";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import Spinner from "./components/Spinner/Spinner";
import Alert from "./components/Alert/Alert";

const images = [
  w0,
  w1,
  w2,
  w3,
  w4,
  w5,
  w6,
  w7,
  w8,
  w9,
  w10,
  w11,
  w12,
  w13,
  w14,
  w15,
  w16,
  w17,
  w18,
  w19,
  w20,
];

const duration = 3000;

const BackgroundSlider = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
  transition: background-image;
`;

// const AppContent = styled.div`
//   position: relative;
//   z-index: 1;
//   color: white;
//   padding: 20px;
// `;

const App = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // console.log("import.meta.env", import.meta.env.VITE_API_KEY);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);
  // useEffect(() => {
  //   setCurrentImage(0);
  // }, []);

  // const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather(); //MOD
  const {
    weather,
    loading,
    notFound,
    fetchWeather,
    setNotFound,
    hasWeatherData,
  } = useWeather();
  return (
    <>
      <BackgroundSlider
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />{" "}
      <h1 className={styles.title}>Weather Search</h1>
      {/* <Spinner /> */}
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} setNotFound={setNotFound} />
        {loading && <Spinner />}
        {/* <Spinner /> */}
        {hasWeatherData && <WeatherDetail weather={weather}></WeatherDetail>}
        {notFound && <Alert>City not found!</Alert>}
      </div>
    </>
  );
};

export default App;
