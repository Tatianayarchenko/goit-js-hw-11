export default class LoadMoreButton {
  constructor({ selector, hidden = false }) {
    this.button = document.querySelector(selector);
    //   hidden && this.hide();
    if (hidden) {
      this.hide();
    }
  }

  show() {
    this.button.classList.remove('is-hidden');
  }

  hide() {
    this.button.classList.add('is-hidden');
  }
}
