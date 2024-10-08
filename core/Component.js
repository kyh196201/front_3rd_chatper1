export default class Component {
  $target = null;

  state = {};

  events = [];

  constructor($target, props = {}) {
    this.$target = $target;
    this.setup();
    this.initEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  destroy() {
    this.events.forEach(({ eventType, handler }) => {
      this.$target.removeEventListener(eventType, handler);
    });
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  initEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const handler = (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    };

    this.$target.addEventListener(eventType, handler);

    this.events.push({
      eventType,
      handler,
    });
  }
}
