import Fetcher from './Fetcher';
import WeatherData from './WeatherData';
import Handler from './Handler';

export default class UI {
  init() {
    this.fetcher = new Fetcher();
    this.weatherData = new WeatherData();
    this.handler = new Handler(this);
  }

  async updateWeather(city) {
    try {
      const data = await this.fetcher.fetchWeatherData(city);
      this.weatherData.setTodayData(data);
      this.updateUI();
    } catch (error) {
      alert(error.message);
    }
  }

  updateUI() {
    const todayData = this.weatherData.getTodayData();
    
    const city = document.querySelector('.location-container .city');
    city.textContent = todayData.city;
  }
}
