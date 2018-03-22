<template>
<div class="control">
  <div :class="['input-group', { 'is-active': isActive }]" :data-label="name">  
    <input :type="password? 'password' : 'text'"
        v-validate="{
          email,
          required,
          regex,
          numeric,
          alpha,
          alpha_num: alphaNum,
          alpha_dash: alphaDash,
          alpha_spaces: alphaSpaces,
          between,
          min,
          max,
          confirmed
        }" 
        :name="id" 
        :id="id"
        :disabled="disable" 
        @focus="isActive = true"
        @blur="onBlur" 
        @input="$emit('input', $event.target.value)">
  </div>
  <span class="error" v-show="errors.has(id)">{{errors.first(id)}}</span>
  <a href="" v-if="passwordRecovery">Forgot Password?</a>
</div>
  
</template>

<script>

export default {
  inject: ['$validator'],
  props: {
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    regex: {
      type: RegExp
    },
    numeric: {
      type: Boolean,
      default: false
    },
    alpha: {
      type: Boolean,
      default: false
    },
    alphaNum: {
      type: Boolean,
      default: false
    },
    alphaDash: {
      type: Boolean,
      default: false
    },
    alphaSpaces: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    },
    between: {
      type: [Array, Boolean],
      default: false
    },
    min: {
      type: [Number, Boolean],
      default: false
    },
    max: {
      type: [Number, Boolean],
      default: false
    },
    confirmed: {
      type: [String, Boolean],
      default: false
    },
    passwordRecovery: {
      type: Boolean,
      default: false
    },
    
    password: Boolean,
    disable: Boolean,
    id: String,
    value: String
    
  },
  
  data() {
    return {
      isActive: false
    };
  },

  methods: {
    onBlur(e) {
      if (e.target.value === "" && this.isActive) {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="scss">
.input-group {
  height: 40px;
  line-height: 48px;
  font-size: 12pt;
  transition: all .15s ease-out;
  border-bottom: 3px solid #e5e5e5;
 
  position: relative;
  &:after {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      color: #bebebe;
      font-weight: bold;
      content: attr(data-label);
  }
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
  }

}

.error {
      position: absolute;
      margin-top: 5px;
      font-size: 9pt;
}
</style>



