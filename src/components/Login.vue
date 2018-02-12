<template>
  <div class="container">
     <div class="columns">
      <div class="column">
        <div class="logo">
          <img src="http://localhost:8080/src/assets/bis-logo.png" alt="">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="ui-tabs">
          <div class="tabs">
            <div :class="['tab', { active: selected !== 'app-login'}]" @click="selected = 'app-register'">Register</div>
            <div :class="['tab', { active: selected !== 'app-register'}]" @click="selected = 'app-login'">Login</div>
          </div>
          <div class="tab-body">
            <component :is="selected"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/form/RegisterForm';
import LoginForm from '@/components/form/LoginForm';
import {state} from '@/store/modules/auth';


export default {
  
  components: {
    appRegister: RegisterForm,
    appLogin: LoginForm
  },


  data() {
    return {
      selected: 'app-login'
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  beforeRouteEnter(to, from, next) {
   next(vm => {
     if (vm.isAuthenticated) {
       vm.$router.push('/');
     }
   })
  }
};
</script>

