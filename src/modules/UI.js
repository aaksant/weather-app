import Fetcher from './Fetcher';
import WeatherData from './WeatherData';
import Handler from './Handler';
import icons from './iconLoader';

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

  getSelectedTemperatureMetric() {
    const currentTempratureMetric = document.querySelector('.current-temp-metric');
    return currentTempratureMetric.textContent;
  }

  updateUI() {
    const todayData = this.weatherData.getTodayData();

    // DOM elements
    const mainContainer = document.querySelector('.main-container');
    const city = document.querySelector('.city');
    const condition = document.querySelector('.condition');
    const realTemp = document.querySelector('.real-temp');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind-speed');
    const uvIndex = document.querySelector('.uv-index');

    const icon = document.querySelector('.icon');
    const iconName = todayData.forecast.icon;

    mainContainer.classList.remove('hidden');
    city.textContent = todayData.city;
    condition.textContent = todayData.forecast.conditions;
    realTemp.textContent = todayData.forecast.temp;
    humidity.textContent = todayData.forecast.humidity;
    windSpeed.textContent = todayData.forecast.windspeed;
    uvIndex.textContent = todayData.forecast.uvindex;

    if (icons[iconName]) {
      icon.src = icons[iconName];
    } else {
      alert(`Cannot find icond: ${iconName}`);
    }
  }
}
