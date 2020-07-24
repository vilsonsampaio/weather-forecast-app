import React, { useEffect, useRef, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { GlobalContext } from "../../GlobalStorage";

import "./style.css";

const Input = () => {
  const { setData, city, setCity, setLoading } = useContext(GlobalContext);

  const inputElement = useRef();
  const APIkey = "Coloque aqui a chave de sua API";

  function handleClick(event) {
    event.preventDefault();
    const { value } = inputElement.current;
    if (!value) return alert("informe uma cidade");
    setCity(value);
    inputElement.current.value = "";
  }

  const getWeather = async (city) => {
    try {
      setLoading(true);
      setData(null);
      const fetchWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${APIkey}`
      );
      const weatherJSON = await fetchWeather.json();
      const {
        name,
        weather: [{ description }],
        sys: { country },
        main: { temp, temp_min, temp_max, feels_like, humidity },
        wind: { speed },
      } = weatherJSON;

      setData({
        name,
        country,
        description: description.charAt(0).toUpperCase() + description.slice(1),
        temp: `${Math.round(temp)}ºC`,
        temp_min: `${Math.round(temp_min)}º`,
        temp_max: `${Math.round(temp_max)}º`,
        feels_like: `${Math.round(feels_like)}ºC`,
        humidity: `${Math.round(humidity)}%`,
        wind: `${Math.round(speed * 3.6)}km/h`,
      });
      window.localStorage.setItem("city", city);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Erro ao buscar dados na API");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!city) return;

    getWeather(city);
  }, [city]);

  return (
    <div className="input">
      <input
        ref={inputElement}
        type="text"
        placeholder="Digite a cidade e o país (Ex.: São Paulo, BR)"
      />
      <a href="#" onClick={handleClick}>
        <FiSearch size={16} />
      </a>
    </div>
  );
};

export default Input;
