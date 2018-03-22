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
          <div class="tabs" v-if="selected !== 'app-password-recovery'">
            <div :class="['tab', { active: selected !== 'app-login'}]" @click="selected = 'app-register'">Register</div>
            <div :class="['tab', { active: selected !== 'app-register'}]" @click="selected = 'app-login'">Login</div>
          </div>
          <div class="tabs" v-else>
            <div class="tab active">Password Recovery</div>
          </div>
          <div class="tab-body">
            <div class="content">
              <keep-alive>
                <component :is="selected" @setForm="selected = $event"/>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/form/RegisterForm';
import LoginForm from '@/components/form/LoginForm';
import PasswordRecoveryForm from '@/components/form/PasswordRecoveryForm';

export default {
  
  components: {
    appRegister: RegisterForm,
    appLogin: LoginForm,
    appPasswordRecovery: PasswordRecoveryForm
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

<style lang="scss" scoped>
.content {
  min-height: 34rem;
}

.logo {
  text-align: center;
  img {
    min-height: 5.625rem;
    max-height: 7.5rem;
  }
}
</style>
