import { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";
import { formatTemperature } from "../../utils/index";

type WeatherDetailProps = {
  weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2 className="">Climate of: {weather.name}</h2>
      {/* <p className="">{formatTemperature(weather.main.temp)}&deg;C</p> */}
      <p className={styles.current}>
        {formatTemperature(weather.main.temp)}&deg;C
      </p>
      <div className={styles.temperatures}>
        <p>
          Min <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        </p>
        <p>
          Max <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
        </p>
      </div>
      <div className={styles.temperatures}>
        <p>
          Feels Like: <br />
          <span>{formatTemperature(weather.main.feels_like)}&deg;C</span>
        </p>
        <p className="">
          Humidity <br />
          <span>{weather.main.humidity}%</span>
        </p>
        <p className="">
          Wind Speed <br />
          <span>{weather.wind.speed} Km/h</span>
        </p>
      </div>
    </div>
  );
}
