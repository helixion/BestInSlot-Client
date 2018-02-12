<template>
<div class="group"> 
    <input class="group-input" :type="password? 'password' : 'text'"
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
        @input="$emit('input', $event.target.value)"
        required="required">
    <label class="group-label" for="">{{name}}</label>    
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
    
  }
};
</script>

<style lang="scss">
.error {
    position: absolute;
    font-size: 11px;
    color: #cacaca;
    margin-top: 2px;
}
</style>




