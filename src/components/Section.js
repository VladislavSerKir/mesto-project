export class Section {
  constructor({ items, renderer }, container) {
    this._container = document.querySelector(container);
    this._items = items;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}