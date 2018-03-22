import Slideout from "slideout";

export default {
  name: "slideout-menu",
  props: {
    duration: {
      type: Number,
      default: 300
    },
    easing: {
      type: String,
      default: "ease"
    },
    padding: {
      type: Number,
      default: 256
    },
    tolerance: {
      type: Number,
      default: 70
    },
    touch: {
      type: Boolean,
      default: true
    },
    side: {
      type: String,
      default: "left"
    },
    toggles: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      slideout: null
    };
  },

  mounted() {
    const menu = document.getElementById("menu");
    const panel = document.getElementById("main");
    const opts = {
      menu,
      panel,
      ...this.$props
    };

    const events = [
      "beforeclose",
      "close",
      "open",
      "translatestart",
      "translate",
      "translateend"
    ];

    this.slideout = new Slideout(opts);

    events.forEach(event => {
      this.slideout.on(event, data => {
        this.$emit(`on-${event}`, data);
      });

      this.slideout.once(event, data => {
        this.$emit(`once-${event}`, data);
      });
    });

    this.toggles.forEach(selector => {
      document.querySelector(selector).addEventListener("click", e => {
        this.slideout.toggle();
      });
    });
  },

  render(h) {
    return h("div", this.$slots.default);
  }
};

