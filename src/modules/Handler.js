export default class Handler {
  constructor(ui) {
    this.ui = ui;
    this.handleInput();
    this.handleTemperatureUnitChange();
    this.handleTemperatureFeelChange();
    this.handleSpeedUnitChange();
  }

  handleInput() {
    const form = document.getElementById('form');
    const input = document.getElementById('city');

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.ui.updateWeather(input.value);
    });
  }

  handleTemperatureUnitChange() {
    const tempToggle = document.querySelector('.temp-unit');
    const mainContainer = document.querySelector('.main-container');

    tempToggle.addEventListener('click', () => {
      if (mainContainer.classList.contains('hidden')) return;
      this.ui.changeTemperatureUnit();
    });
  }

  handleTemperatureFeelChange() {
    const mainContainer = document.querySelector('.main-container');

    mainContainer.addEventListener('click', e => {
      const button = e.target.closest('.btn-temp');
      if (button) {
        this.ui.setTemperatureFeel(button.dataset.tempType);
      }
    });
  }

  handleSpeedUnitChange() {
    const speedToggle = document.querySelector('.speed-unit');
    const mainContainer = document.querySelector('.main-container');

    speedToggle.addEventListener('click', () => {
      if (mainContainer.classList.contains('hidden')) return;
      this.ui.changeSpeedUnit();
    });
  }
}
