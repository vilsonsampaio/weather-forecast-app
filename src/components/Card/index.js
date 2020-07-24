import React, { useContext } from "react";
import { FiArrowUp, FiArrowDown, FiX } from "react-icons/fi";

import { GlobalContext } from "../../GlobalStorage";
import "./style.css";

const Card = () => {
  const { data, setData, loading } = useContext(GlobalContext);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <p style={{ color: "white", fontWeight: "bold" }}>Carregando...</p>
      </div>
    );

  if (!data) return <div></div>;

  const {
    country,
    description,
    feels_like,
    humidity,
    name,
    temp,
    temp_max,
    temp_min,
    wind,
  } = data;

  function handleClick(event) {
    event.preventDefault();
    setData(null);
    window.localStorage.setItem("city", "");
  }

  return (
    <div className="card">
      <div className="header">
        <h4>
          {name} - {country}
        </h4>
        <a href="#" onClick={handleClick}>
          <FiX color={"#ff7f00"} size={22} />
        </a>
      </div>
      <h1>
        {temp} {description}
      </h1>
      <div className="info">
        <div className="left">
          <div className="minmax">
            <p className="min">
              <span>
                <FiArrowDown color={"#ff7f00"} size={22} />
              </span>
              <strong>{temp_min}</strong>
            </p>
            <p className="max">
              <span>
                <FiArrowUp color={"#ff7f00"} size={22} />
              </span>
              <strong>{temp_max}</strong>
            </p>
          </div>
          <p>
            Vento<strong>{wind}</strong>
          </p>
        </div>
        <div className="right">
          <p>
            Sensação<strong>{feels_like}</strong>
          </p>
          <p>
            Humidade<strong>{humidity}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
