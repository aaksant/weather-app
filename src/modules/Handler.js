export default class Handler {
  constructor(ui) {
    this.ui = ui;
    this.handleInput();
  }

  handleInput() {
    const form = document.getElementById('form');
    const input = document.getElementById('city');

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.ui.updateWeather(input.value);
    });
  }
}
