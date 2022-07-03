import React, { useEffect, useState } from "react";
import { WiDaySunny, WiHumidity, WiSleet, WiSandstorm } from "react-icons/wi";
//import { BsSearch } from "react-icons/bs";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a1c62990133e8cc65e01cc6401d23be8`;
      const res = await fetch(url);
      console.log("my api data", res);
      const data = await res.json();
      console.log("my api json data", data);

      const { temp, humidity, pressure } = data.main;
      console.log("temprature : humidity :pressure", temp, humidity, pressure);
      const { country, sunset } = data.sys;
      console.log(country);
      const { name } = data;
      console.log(name);
      const { speed } = data.wind;
      const { main: weatherCondition } = data.weather[0];

      const getNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        name,
        country,
        speed,
        sunset,
        weatherCondition,
      };
      setTempInfo(getNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <div className="body">
      <div className="search">
        <input
          type="search"
          placeholder="Search bar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="button" onClick={getWeatherInfo}>
          Search
        </button>
      </div>
      <div className="gridContianer">
        <div className="gridItem1">
          <WiDaySunny />
        </div>
        {/* /// 2nd grid item */}

        <div className="gridItem2">
          <div className="inn_row">
            <div className="left_column">
              <span className="deg">{tempInfo.temp}°</span>

              <span className="conditions">
                {tempInfo.weatherCondition}
                <br />
                {tempInfo.name}
              </span>
            </div>

            <div className="right_column">
              <h2>{date}</h2>
            </div>
          </div>
        </div>

        <div className="gridItem3">
          <div className="content_container1">
            <div className="icon1">
              <WiDaySunny />
            </div>
            <div className="content1">
              Sun Set
              <br />
              {tempInfo.sunset}
            </div>
          </div>

          <div className="content_container2">
            <div className="icon1">
              <WiHumidity />
            </div>

            <div className="content1">
              Humidity
              <br />
              {tempInfo.humidity}
            </div>
          </div>

          <div className="content_container2">
            <div className="icon1">
              <WiSleet />
            </div>

            <div className="content1">
              Pressure
              <br />
              {tempInfo.pressure}
            </div>
          </div>

          <div className="content_container2">
            <div className="icon1">
              <WiSandstorm />
            </div>

            <div className="content1">
              Speed
              <br />
              {tempInfo.speed}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
