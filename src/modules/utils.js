function convertTemperature(temp, isFahrenheit) {
  return isFahrenheit ? temp : ((temp - 32) * 5) / 9;
}

function convertSpeed(speed, isMph) {
  return isMph ? speed : Math.round(speed * 1.60934);
}

export { convertTemperature, convertSpeed };
