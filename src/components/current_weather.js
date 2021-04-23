import React from 'react';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

import Forecast from './forecast';
import ToggleButton from './toggleButton';

const apiIconUrl = process.env.REACT_APP_ICON_URL;

const CurrentWeather = props => {
  const { weather, forecast, units, onUnitsChange } = props;
  const [isSettingsMenuOpened, setIsSettingsMenuOpened] = React.useState(false);
  const [isMetric, setIsMetric] = React.useState(
    units.match(/metric/i) ? true : false,
  );

  const date = dayjs().isValid(weather.date) ? weather.date : '';
  const currentTime = dayjs
    .utc(date)
    .utcOffset(weather.timezone)
    .format();
  const description =
    weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
  
  const tempUnit = isMetric? 'C' :'F';

  const toggleSettingsMenu = () => {
    setIsSettingsMenuOpened(!isSettingsMenuOpened);
  };

  const handleChange = () => {
    onUnitsChange(units.match(/metric/i) ? 'imperial' : 'metric');
    setIsMetric(!isMetric);
    toggleSettingsMenu();
  };

  // Add images for day and night
  let iconId = weather.icon;
  let isDay = iconId.includes('d');
  if(isDay){
    document.body.classList.add('dayImg');
    document.body.classList.remove('nightImg');
  }

  if(!isDay){
    document.body.classList.remove('dayImg');
    document.body.classList.add('nightImg');
  }

  return (
    <>
      <div className="shadow-lg rounded-xl h-auto overflow-hidden w-full md:w-3/5 lg:w-1/2 m-auto mt-4">
        <div className="m-4">
            <div className="flex flex-row justify-between my-8 lg:my-4 tracking-wide">
            <span className="tracking-wide text-2xl font-semibold">
            {weather.location}, {weather.country}
              <span className="flex flex-col text-gray-500 font-normal tracking-wide text-base mt-1">
              {dayjs(date).format('dddd')},{' '}
              {dayjs
                .utc(date)
                .utcOffset(weather.timezone)
                .format('h:mm A')}
              , {description}
              </span>
            </span>
            <div>
            <ToggleButton defaultChecked={true} onChange={handleChange}/>
            </div>
          </div>
          <div className="flex flex-row justify-between my-8 lg:my-4 text-5xl lg:text-6xl tracking-wide">
            <span className="text-gray-500 font-light">
              {weather.temperature}&deg;{tempUnit}
              <span className="flex flex-col text-gray-500 font-normal tracking-wide text-base mt-1">
                Feels like {weather.feels_like}&deg;{tempUnit}
              </span>
            </span>
            <div>
              <span><img src={`${apiIconUrl}n/${weather.icon_code}@2x.png`}
                          /></span>
            </div>
          </div>
          <div className="text-indigo-700 mt-1">
            <span className="wi wi-strong-wind text-xl"></span>
            <span className="ml-1 mr-2 text-gray-500 tracking-wide">
              {weather.wind_speed}
              {isMetric ? `m/s` : `mph`} winds
            </span>
            <span className="wi wi-humidity text-xl"></span>
            <span className="ml-1 text-gray-500 tracking-wide">
              {weather.humidity}% humidity {' '}
            </span>
            <span className="wi wi-cloud-down text-xl"></span>
            <span className="ml-1 text-gray-500 tracking-wide">
              {weather.pressure}mmHg
            </span>
          </div>
          <Forecast forecast={forecast}
          tempUnit={tempUnit} />
        </div>
      </div>  
    </>
  );
};

export default CurrentWeather;
