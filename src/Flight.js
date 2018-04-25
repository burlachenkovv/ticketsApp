import React from 'react';
import logo from './images/vectorpaint.svg';

const Flight = ({ tickets, currency }) => {
    const transfers = (stops) => {
      if(stops) {
        return `${stops} Transfer${(stops > 1) ? "s" : ""}`;
      }
      return null;
    }

    const getDate = (date) => {
      let options = {year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'};
      let dateString = new Date(date.replace(/(\d+)\.(\d+)\.(\d+)/, '$2/$1/$3'));

      return dateString.toLocaleString('en', options);
    }
    
    const departure = getDate(tickets.departure_date);
    const arrival = getDate(tickets.arrival_date);

    return (
      <div className="flight flex">
        <div className="flight-buy">
          <img src={logo} className="airline-logo" alt="Turkish airlines" />
          <button>
            Buy ticket <br />
            {` ${Math.round(tickets.price / currency.rate) } ${currency.name } `}
          </button>
        </div>
        <div className="flight-info flex">
            <div>
              <h3>{ tickets.departure_time }</h3>
              <span>{` ${tickets.origin}, ${tickets.origin_name} `}</span>
              <span className="gray">
                { departure }
              </span>
            </div>
            <div>
              <span className="gray">
                { transfers(tickets.stops) }
              </span>
            </div>
            <div>
              <h3>{ tickets.arrival_time }</h3>
              <span>{` ${tickets.destination}, ${tickets.destination_name} `}</span>
              <span className="gray">
                { arrival }
              </span>
            </div>
        </div>
      </div>
    );
}

export default Flight;
