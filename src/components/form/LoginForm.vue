<template>
  <div id="login">
    <form>
      <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">
        <app-input 
        :name="'Email Address *'" 
        :email="true" 
        :required="true" 
        :id="'loginEmail'" 
        v-model="email"></app-input>
      <app-input 
        :password="true" 
        :passwordRecovery="true"
        :name="'Password *'" 
        :min="8" 
        :max="20" 
        :required="true" 
        :id="'loginPassword'" 
        v-model="password"></app-input>
        <app-input
          :email="true"
          :name="'Password Recovery Address'"
          :id="forgotPassword"
          v-model="forgotPassword"
          v-if="forgotPassword"
          @showRecoveryInput="forgotPassword = !forgotPassword"></app-input>
      <div class="group">
        <button :class="buttonClasses" @click.prevent="authenticate" :disabled="isDisabled || errors.any()">Sign In</button>
      </div>
      </fieldset>
    </form> 
  </div>
</template>

<script>
import Input from '@/components/inputs/GroupInput';

export default {
  components: { appInput: Input },

  $_veeValidate: {
      validator: 'new'
  },
  
  data() {
      return {
          email: '',
          password: '',
          forgotPassword: '',
          sending: false,
          forgotPassword: false
      }
  },

  computed: {
    isDisabled() {
      const { email, password } = this.$data;
      return !email || !password;
    },

    buttonClasses() {
      return ['button is-medium is-block is-outlined is-info', { 'is-loading': this.sending}];
    }
  },

  methods: {
    authenticate() {
      const { email, password } = this.$data;
      this.sending = true;
      this.$store.dispatch('authenticate', { email, password })
        .then(() => {
          this.sending = false;
          this.$router.push('/myaccount');
        })
        .catch(e => {
          if (e.response.status >= 400) {
            this.sending = false;
            this.$notify({
              group: 'notes',
              type: 'danger',
              text: `${e.response.status}`
            })
          }
        })
        this.email = '';
        this.password = '';
    }
  }

}
</script>
