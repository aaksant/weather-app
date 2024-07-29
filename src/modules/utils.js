function convertTemperature(temp, isFahrenheit) {
  return isFahrenheit ? temp : ((temp - 32) * 5) / 9;
}

export { convertTemperature };
