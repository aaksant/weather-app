import Fetcher from './Fetcher';
import WeatherData from './WeatherData';
import Handler from './Handler';
import icons from './iconLoader';
import { convertTemperature, convertSpeed } from './utils';
import { isTomorrow } from 'date-fns';

export default class UI {
  constructor() {
    this.fetcher = new Fetcher();
    this.weatherData = new WeatherData();
    this.handler = new Handler(this);

    this.currentTempType = 'temp';
    this.isFahrenheit = true;
    this.isMph = true;
  }

  async updateWeather(city) {
    try {
      const data = await this.fetcher.fetchWeatherData(city);

      this.weatherData.setCity(data);
      this.weatherData.setTodayForecast(data);
      this.weatherData.setUpcomingForecast(data);

      this.updateUI();
    } catch (error) {
      return;
    }
  }

  changeTemperatureUnit() {
    const currentTemperatureUnit = document.querySelector('.temp-unit');

    currentTemperatureUnit.textContent = this.isFahrenheit
      ? 'Fahrenheit'
      : 'Celcius';
    this.isFahrenheit = !this.isFahrenheit;
    this.updateUI();
  }

  changeSpeedUnit() {
    const currentSpeedUnit = document.querySelector('.speed-unit');

    currentSpeedUnit.textContent = this.isMph ? 'Mph' : 'Km/h';
    this.isMph = !this.isMph;
    this.updateUI();
  }

  setTemperatureFeel(type) {
    this.currentTempType = type;
    this.updateUI();
  }

  updateUI() {
    const mainContainer = document.querySelector('.main-container');
    const todayForecast = this.weatherData.getTodayForecast();
    const upcomingForecast = this.weatherData.getUpcomingForecast();
    const city = this.weatherData.getCity();

    mainContainer.classList.remove('hidden');
    this.renderTodayForecast(todayForecast, city);
    this.renderUpcomingForecast(upcomingForecast);
  }

  renderTodayForecast(todayForecast, city) {
    const todayForecastContainer = document.querySelector('.today-forecast');
    const temperatureUnit = this.isFahrenheit ? 'F' : 'C';
    const speedUnit = this.isMph ? 'Mph' : 'Km/h';

    const tempValue = convertTemperature(
      todayForecast[this.currentTempType],
      this.isFahrenheit
    );

    const html = `
      <div class="location">
        <span class="city">${city}</span>
      </div>
      <div class="info">
        <div class="general">
        <img
          src="${icons[todayForecast.icon]}"
          alt="${icons[todayForecast.icon]}"
          class="icon"
        />
        <span class="condition">${todayForecast.conditions}</span>
        </div>
        <div class="details">
          <div class="temp-container">
            <span class="temp">${Math.round(
              tempValue
            )}°${temperatureUnit}</span>
            <div class="btn-temp-container">
              <button class="btn-temp btn ${
                this.currentTempType === 'temp' ? 'active' : ''
              }" data-temp-type="temp">Real</button>
              <button class="btn-temp btn ${
                this.currentTempType === 'tempmin' ? 'active' : ''
              }" data-temp-type="tempmin">Min</button>
              <button class="btn-temp btn ${
                this.currentTempType === 'tempmax' ? 'active' : ''
              }" data-temp-type="tempmax">Max</button>
            </div>
          </div>
          <div class="others">
            <div class="other-item">
              <span class="label humidity">Humidity</span>
              <span class="value">${todayForecast.humidity}</span>
            </div>
            <div class="other-item">
              <span class="label wind-speed">Wind speed</span>
              <span class="value">${convertSpeed(
                todayForecast.windspeed,
                this.isMph
              )} ${speedUnit}</span>
            </div>
            <div class="other-item">
              <span class="label uv-index">Wind direction</span
              ><span class="value">${todayForecast.winddir}°</span>
            </div>
            <div class="other-item">
              <span class="label uv-index">UV Index</span
              ><span class="value">${todayForecast.uvindex}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    todayForecastContainer.innerHTML = html;
  }

  renderUpcomingForecast(data) {
    const upcomingForecastContainer =
      document.querySelector('.upcoming-forecast');
    upcomingForecastContainer.innerHTML = '';

    for (const { icon, datetime, conditions, temp } of data) {
      const unit = this.isFahrenheit ? 'F' : 'C';
      const tempValue = convertTemperature(temp, this.isFahrenheit);
      const forecastRow = `
          <div class="forecast-row">
            <div class="row-left">
              <img
                src="${icons[icon]}"
                alt="${icons[icon]}"
                class="upcoming-forecast-icon"
              />
              <span class="date">${
                isTomorrow(datetime) ? 'Tomorrow' : datetime
              }</span>
              <span class="condition">${conditions}</span>
            </div>
            <div class="row-right">
              <span class="temp">${Math.round(tempValue)}°${unit}</span>
            </div>
          </div>
        `;

      upcomingForecastContainer.insertAdjacentHTML('beforeend', forecastRow);
    }
  }
}
