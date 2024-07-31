export default class WeatherData {
  constructor() {
    this.todayForecast = null;
    this.city = null;
  }

  getCity() {
    return this.city;
  }

  getTodayForecast() {
    return this.todayForecast;
  }

  setCity(data) {
    const city = data.address;
    this.city = city;
  }

  setTodayForecast(data) {
    const forecast = data.days[0];
    this.todayForecast = { forecast };
  }
}
