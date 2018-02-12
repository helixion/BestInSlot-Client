<template>
<div :id="form.title">
  <div class="form-header">
    <h2>{{form.title[0].toUpperCase() + form.title.slice(1).toLowerCase()}}</h2>
    <span v-if="form.toggle" 
      class="toggle xs-show" 
      @click.prevent="showForm = !showForm">{{showForm? '&#9660;' : '&#9650;'}}</span>
    <div class="h-lines">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
  </div>
  <template v-if="form.canCollapse">
    <form v-show="showForm">
    <div class="control" v-for="(field, i) in fData" :key="i">
      <div class="input-group">
        <label>{{field.label}}</label>
        <input :type="field.type" :name="field.id" v-model="field.bind" v-validate="field.validations">
      </div>
      <span class="error" v-show="errors.has(field.id)">{{errors.first(field.id)}}</span>
    </div>
    <div class="control">
         <button class="btn" @click.prevent :disabled="errors.any()">Register</button>
    </div>
  </form>
  </template>  
  <template v-else>
    <form>
    <div class="control" v-for="(field, i) in fData" :key="i">
      <div class="input-group">
        <label for="">{{field.label}}</label>
        <input :type="field.type" :name="field.id" v-model="field.bind" v-validate="field.validations" required>
      </div>
      <span class="error" v-show="errors.has(field.id)">{{errors.first(field.id)}}</span>
    </div>
    <div class="control">
         <button class="btn" @click.prevent="submit" :disabled="errors.any()">Register</button>
    </div>
  </form>
  </template>
</div>
</template>


<script>

export default {

  $_veeValidaite: {
    validator: '$validator'
  },
  
  props: {
    form: {
      type: Object,
      required: true
    },

  },

  created() {
    // delete this.$props.form.fields;
    this.fData = this.$props.form.fields.map(field => {
      const bind = field.bind;
      this.f.push({
        [field.name]: ''
      })
      delete field.bind;
      return {
        ...field,
        bind: this.f.find(f => f.name === field.name)
      }
    })
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      window.addEventListener("resize", vm.adjust, false);
      window.addEventListener("orientationchange", vm.adjust, false);
    });
  },

  beforeRouteLeave(to, from, next) {
    next(vm => {
      window.removeEventListener("resize", vm.adjust, false);
      window.removeEventListener("orientationchange", vm.adjust, false);
    });
  },

  data() {
    return {
      email: '',
      username: '',
      password: '',
      catchpa: '',
      showForm: true,
      fData: null,

      f: []
    }
  },

  methods: {
    submit() {
      if (!this.errors.any()) {
        this.$emit('disableForms');
        setTimeout(() => {
          this.$emit('enableForms');
        }, 1000);
      }
    },

     adjust() {
      let width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      if (width > this.widthBreakPoint && !this.showRegister) {
        this.showForm = true;
      }
    }
  }
};
</script>


<style lang="scss">
.input-group {
  height: 40px;
  line-height: 48px;
  font-size: 12pt;
  border-bottom: 3px solid #e5e5e5;
  position: relative;
  &.is-active {
      line-height: 11px;
      font-size: 9pt;
      border-color: #50a4c3
  }

  input {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 12pt;
    :focus ~ label,
    :valid ~ label {
      top: -20px;
      font-size: 11pt;
    }
  }

  label {
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    transition: all 0.2s ease;
  }

}

.error {
      line-height: 11px;
      font-size: 9pt;
}
</style>
