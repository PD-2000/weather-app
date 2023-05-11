import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = () => {
  const [weather, setWeather] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleCityChange = useCallback(city => {
    setWeather(null);
    setPending(true);
    setError(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c7fe393dd73d772ac79d26e31e9e305&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              // console.log(data);
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };

              setWeather(weatherData);
            })
          }
          else
            setError('There is no such city.');
      })
      .catch(() => {
        setError('Unknown error - try again later.');
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather && <WeatherSummary {...weather} /> }
      { pending && <Loader /> }
      { error && <ErrorBox error={error} /> }
    </section>
  )
};

export default WeatherBox;