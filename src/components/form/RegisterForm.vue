<template>
  <div id="register">
    <form>
      
      <fieldset :class="{ 'is-disabled': sending }" :disabled="sending">

      <app-input 
      :name="'Email Address *'" 
      :email="true" 
      :required="true" 
      :id="'email'" 
      v-model="credentials.email"></app-input>

      <app-input 
        :name="'Full Name *'" 
        :required="true" 
        :alphaSpaces="true"
        :id="'name'" 
        v-model="credentials.fullname"></app-input>

      <app-input 
        :name="'Username *'" 
        :id="'username'" 
        :alphaSpaces="true" 
        :required="true" 
        v-model="credentials.username"></app-input>

      <app-input 
        :password="true" 
        :name="'Password *'" 
        :id="'password'"
        :required="true" 
        :alphaNum="true" 
        :min="8" 
        :max="20" 
        v-model="credentials.password"></app-input>

      <app-input 
        :password="true" 
        :name="'Re-type Password *'"
        :id="'confirm'" 
        :required="true" 
        :alphaNum="true"></app-input>

      <div class="group">
        {{isDisabled}}
        <button :class="buttonClasses" @click.prevent="createNewUser" :disabled="isDisabled || errors.any()">Register</button>
      </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import Input from "@/components/inputs/GroupInput";
export default {
  components: {
    appInput: Input
  },

  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      credentials: {
        email: "",
        username: "",
        fullname: "",
        password: "",
      },
      sending: false
    };
  },

  computed: {
    isDisabled() {
      const {
        email,
        username,
        fullname,
        password
      } = this.credentials;

      return !email || !username || !fullname || !password;
    },

    buttonClasses() {
      return ['button is-block is-medium is-outlined is-info', { 'is-loading': this.sending}];
    }
  },

  methods: {
    createNewUser() {
      const { credentials } = this.$data;

      if (!this.errors.any() && !this.isDisabled) {
        this.sending = true;
        this.$http
          .post("/users", {
            credentials
          })
          .then(res => {
            this.sending = false;
            this.$notify({
              group: 'notes',
              type: 'success',
              title: "Thank you for registering.",
              text: "An activation email has been dispatched, please activate.",
              duration: 3000
            })
            this.clearForm();
          })
          .catch(e => {
            this.sending = false;
            console.log(e);
          });
      }
    },

    clearForm() {
     this.credentials.email = "";
     this.credentials.fullname = "";
     this.credentials.username = "";
     this.credentials.password = "";       
    }
  }
};
</script>
