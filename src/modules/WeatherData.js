export default class WeatherData {
  constructor() {
    this.todayData = null;
  }

  getTodayData() {
    return this.todayData;
  }

  setTodayData(data) {
    const city = data.address;
    const forecast = data.days[0];
    this.todayData = { city, forecast };
  }
}
