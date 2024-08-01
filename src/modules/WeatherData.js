export default class WeatherData {
  constructor() {
    this.city = null;
    this.todayForecast = null;
    this.upcomingForecast = null;
  }

  getCity() {
    return this.city;
  }

  getTodayForecast() {
    return this.todayForecast;
  }

  getUpcomingForecast() {
    return this.upcomingForecast;
  }

  setCity(data) {
    const city = data.address;
    this.city = city;
  }

  setTodayForecast(data) {
    const todayForecast = data.days[0];
    this.todayForecast = todayForecast;
  }

  setUpcomingForecast(data) {
    const forecast = data.days;
    this.upcomingForecast = forecast.slice(1, 8);
  }
}
