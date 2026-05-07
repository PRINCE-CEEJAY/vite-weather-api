import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Weather = () => {
  const [country, setCountry] = useState('london');
  const [searchCountry, setSearchCountry] = useState('london');

  const fetchWeatherData = async () => {
    const response = await axios.get(import.meta.env.VITE_WEATHER_BASE_URL, {
      params: {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: searchCountry,
      },
    });

    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weather', searchCountry],
    queryFn: fetchWeatherData,
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    setSearchCountry(country);
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occurred</p>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='container'
      >
        <input
          className='focus:ring-2 border-2 p-2 rounded-md grow'
          value={country}
          placeholder='Enter country'
          onChange={(e) => setCountry(e.target.value)}
        />

        <button className='px-4 py-1 rounded-md bg-green-800 text-white hover:cursor-pointer hover:opacity-90'>
          Fetch
        </button>
      </form>

      <div className='container mt-6'>
        <h1>{data?.location?.name}</h1>
        <p>{data?.current?.temp_c}°C</p>
      </div>
    </div>
  );
};

export default Weather;
