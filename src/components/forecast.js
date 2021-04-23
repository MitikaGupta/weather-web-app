import React from 'react';
import dayjs from 'dayjs';

const apiIconUrl = process.env.REACT_APP_ICON_URL;
const Forecast = props => {
  const { forecast , tempUnit} = props;
  return (
    <div className="mt-4 border-t border-green-300">
      {forecast.map((item, index) => {

        return (
          <ul className="mt-4" key={index}>
            <li className="flex flex-row text-gray-500 p-1">
              <span className="flex-1 text-left">
                {dayjs(item.dt_txt).format('dddd')}
              </span>
              <span style={{height: "40px"}} >
                <img style={{height: "100%"}} src={`${apiIconUrl}n/${item.icon_code}@2x.png`}
                          />
              </span>
              <span className="flex-1 text-right">
                {item.min}&deg;{tempUnit} / {item.max}&deg;{tempUnit}
              </span>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Forecast;
