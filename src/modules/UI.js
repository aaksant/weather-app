import Fetcher from './Fetcher';
import WeatherData from './WeatherData';
import Handler from './Handler';
import icons from './iconLoader';
import { convertTemperature } from './utils';

export default class UI {
  constructor() {
    this.fetcher = new Fetcher();
    this.weatherData = new WeatherData();
    this.handler = new Handler(this);
    this.isFahrenheit = true;
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

  changeTemperatureUnit() {
    this.isFahrenheit = !this.isFahrenheit;
    this.updateUI();
  }

  loadIcon(data) {
    const icon = document.querySelector('.icon');
    const iconName = data.forecast.icon;

    if (icons[iconName]) {
      icon.src = icons[iconName];
    } else {
      alert(`Cannot find icon: ${iconName}`);
    }
  }

  updateUI() {
    const todayData = this.weatherData.getTodayData();
    this.loadIcon(todayData);

    const mainContainer = document.querySelector('.main-container');
    const city = document.querySelector('.city');
    const condition = document.querySelector('.condition');
    const temp = document.querySelector('.temp');
    const humidity = document.querySelector('.humidity + .value');
    const windSpeed = document.querySelector('.wind-speed + .value');
    const uvIndex = document.querySelector('.uv-index + .value');

    const currentTempUnit = document.querySelector('.temp-unit');
    const tempValue = +convertTemperature(
      todayData.forecast.temp,
      this.isFahrenheit
    );
    const unit = this.isFahrenheit ? 'F' : 'C';

    mainContainer.classList.remove('hidden');
    currentTempUnit.textContent = this.isFahrenheit ? 'Fahrenheit' : 'Celcius';

    city.textContent = todayData.city;
    condition.textContent = todayData.forecast.conditions;
    temp.textContent = `${Math.round(tempValue)}°${unit}`;
    humidity.textContent = todayData.forecast.humidity;
    windSpeed.textContent = todayData.forecast.windspeed;
    uvIndex.textContent = todayData.forecast.uvindex;
  }
}
