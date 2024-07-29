export default class Handler {
  constructor(ui) {
    this.ui = ui;
    this.handleInput();
    this.handleTemperatureUnitChange();
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
}
