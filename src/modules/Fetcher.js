export default class Fetcher {
  async fetchWeatherData(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=V5JDZWU4MUC88DMTXBNM9596U`;

    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`City ${city} not found`);
      }

      return await response.json();
    } catch (error) {
      alert(error.message);
      return null;
    }
  }
}
