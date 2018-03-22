<template>
  <div :class="rootClasses" @click.stop>
      <div class="modal-background"></div>
      <div class="modal-header">
          <div class="tabs is-fullwidth is-medium">
              <ul>
                  <li :class="{ 'is-active': selected === 'app-register'}" @click.prevent="selected = 'app-register'"><a><span>Register</span></a></li>
                  <li :class="{ 'is-active': selected === 'app-login'}" @click.prevent="selected = 'app-login'"><a><span>Sign In</span></a></li>
              </ul>
          </div>
      </div>
      <div class="modal-content">
          <keep-alive>
            <component :is="selected"></component>
          </keep-alive>
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
      appPassword: PasswordRecoveryForm
  },

  data() {
      return {
          selected: 'app-login'
      }
  },

  component: {
      modalIsActive() {
          return this.$store.getters.modalIsActive;
      },
      rootClasses() {
          return ['modal', { 'is-active': this.modalIsActive }];
      }
  }
}
</script>

