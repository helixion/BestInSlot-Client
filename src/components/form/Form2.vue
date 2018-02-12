<script>
  (function () {
    function fields(h, fields) {
      const self = this;

      const InputOn = {
        domsProps: {
          value: self.value
        },
        on: {
          input: function (event) {
            self.value = event.target.value;
            self.$emit('input', event.target.value);
          },
          focus: function (event) {
            self.isActive = true;
          },
          blur: function (event) {
            if (event.target.value === '') {
              self.isActive = false;
            }
          }
        }
      };

      return fields.map(field => {
        h(
          "div", {
            class: {
              control: true
            }
          }, [
            h(
              "div", {
                class: {
                  "input-group": true,
                  "is-active": field.isActive
                },
                attr: {
                  "data-label": field.name
                }
              }, [
                function () {
                  if (field.type === "input" && !password && !hidden) {
                    return h("input", {
                      inputOn
                    });
                  }
                  if (field.type === input && password) {
                    return h("input", {
                      on,
                      attr: {
                        type: "password"
                      }
                    });
                  }
                  if (field.type === hidden) {
                    return h("input", {
                      inputOn,
                      attr: {
                        type: "hidden"
                      }
                    });
                  }
                  if (field.type === "button") {
                    return h(
                      "button", {
                        on: {
                            click: function(event) {
                                //do nothing.
                            }
                        },
                        class: {
                          btn: true
                        }
                      },
                      field.text
                    );
                  }
                }()
              ]
            ),
            h("span", {
              class: {
                error: true
              }
            })
          ]
        );
      });
    }

    function renderForm(h, form) {
      const self = this;
      return h('div', {
          attr: {
            id: form.title
          }
        },
        function () {
          if (self.toggle) {
            return h(
              "form", {
                style: {
                  display: show ? "flex" : ""
                }
              },
              fields(h, fields)
            );
          } else {
            return h(
              "form",
              fields(h, fields)
            )
          }
        }())
    }

    return {
      props: {
        form: {
          type: Object,
          required: true
        }
      },

      render(h) {
        return renderForm(h, form);
      }
    }
  })();
</script>
