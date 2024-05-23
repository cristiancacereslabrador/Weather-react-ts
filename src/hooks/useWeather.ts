import axios from "axios";
import { SearchType } from "../types";
// import { SearchType, Weather } from "../types";
import { z } from "zod";
// import { object, number, string, Output, parse } from "valibot";
import { useMemo, useState } from "react";
//** GUARD O ASSERTION
// function isWeatherResponde(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.feels_like === "number" &&
//     typeof (weather as Weather).main.humidity === "number" &&
//     typeof (weather as Weather).main.pressure === "number" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }
//** GUARD O ASSERTION

//**    ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    feels_like: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;
//**    ZOD
//**    VALIBOT
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     feels_like: number(),
//     humidity: number(),
//     pressure: number(),
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });
// type WeatherType = Output<typeof WeatherSchema>;
//**    VALIBOT

const initialState = {
  name: "",
  main: {
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  wind: {
    speed: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState);
    try {
      // console.log("consultando...");
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;
      const { data } = await axios(geoURL);
      // const resGeoURL = await fetch(geoURL);
      // Convertir la respuesta a JSON
      // const dataG = await resGeoURL.json();
      // console.log("data", dataG);
      // console.log("geoURL Latitud", dataG[0].lat);
      // console.log("geoURL Longitud", dataG[0].lon);
      // const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${dataG[0].lat}&lon=${dataG[0].lon}&appid=${appId}`;
      // const resWeatherURL = await fetch(weatherURL);
      // const dataW = await resWeatherURL.json();
      // console.log("data", data);
      //** Comprobar si existe */
      if (!data[0]) {
        // console.log("clima no encontrado");
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      //**      CASTEAR EL TYPE
      // const { data: weatherResult } = await axios<Weather>(weatherURL);
      // console.log(" TEMP", weatherResult.main.temp);
      // console.log(" NAME", weatherResult.name);
      //** CASTEAR EL TYPE

      //**      TYPE GUARDS
      // const { data: weatherResult } = await axios(weatherURL);
      // const result = isWeatherResponde(weatherResult);
      // console.log("result", result);
      // if (result) {
      //   console.log("weatherResult.name", weatherResult.name);
      // }
      // console.log(" TEMP", weatherResult.main.temp);
      // console.log(" NAME", weatherResult.name);
      //**  TYPE GUARDS
      //**    ZOD
      const { data: weatherResult } = await axios(weatherURL);
      const result = Weather.safeParse(weatherResult);
      // console.log("result.data", result.data);
      // console.log("weatherResult", weatherResult);
      if (result.success) {
        setWeather(result.data);
        console.log("result", result);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      //**    ZOD
      //**    VALIBOT
      // const { data: weatherResult } = await axios<WeatherType>(weatherURL);
      // const result = parse(WeatherSchema, weatherResult);
      // if (result) {
      //   console.log(" result.name ", result.name);
      // }
      //**    VALIBOTeather
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    notFound,
    setNotFound,
    fetchWeather,
    hasWeatherData,
  };
}
