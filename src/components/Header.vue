<template>
  <div id="header" @click.stop>
      <div class="container">
          <div class="navbar">
              <div class="navbar-brand">
                  <img src="http://localhost:8080/src/assets/bis-logo-sm.png" alt="">
                  <button :class="['button', 'navbar-burger', { 'is-active': active }]" @click="active = !active">
                      <span></span>
                      <span></span>
                      <span></span>
                  </button>
              </div>
              <div :class="['navbar-menu', { 'is-active': active }]">
                  <div class="navbar-start">
                      <router-link class="navbar-item" to="/">Home</router-link> 
                      <router-link class="navbar-item" to="/">History</router-link> 
                      <router-link class="navbar-item" to="/">Recruitment</router-link> 
                      <router-link class="navbar-item" to="/">Media</router-link> 
                      <a href="http://localhost:3000/session/sso" class="navbar-item" v-if="isAuthenticated" target="_blank">Discussion</a>           
                      <a href="http://localhost:3000" class="navbar-item" v-if="!isAuthenticated" target="_blank">Discussion</a>                                                 
                  </div>
                  <div class="navbar-end" v-if="!isAuthenticated">
                      <router-link class="navbar-item" to="/auth">
                        <i class="fa fa-user-circle"/>
                        <span>Login</span>
                      </router-link>
                  </div>
                  <div class="navbar-end" v-else>
                      <div class="dropdown is-right is-hoverable" v-if="currentUser">
                          <div class="dropdown-trigger">
                              <div aria-haspopup="true" aria-controls="dropdown-menu">
                                  <span>My Account</span>
                                  <span class="icon is-small">
                                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                  </span>
                              </div>
                          </div>
                          <div class="dropdown-menu" id="dropdown-menu" role="menu">
                              <div class="dropdown-header">
                                  <span class="icon is-medium">
                                      <img class="avatar" :src="currentUser.avatar" alt="">
                                  </span>
                                  <span class="username">{{currentUser.username}}</span>
                              </div>
                              <div class="dropdown-content">
                                  <router-link to="/myaccount" class="dropdown-item">Profile</router-link>
                                  <a class="dropdown-item" @click.prevent="invalidate">Logout</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
      ...mapGetters([
          'isAuthenticated',
          'currentUser'
      ])
  },

  data() {
      return {
          active: false,
          el: null
      }
  },

  mounted() {
      this.el = document.querySelector('body');
      this.el.addEventListener('click', (e) => {
          if (this.active) {
              this.active = false;
          }
      }, false);
  },
  
  created() {
      const token = window.localStorage.getItem('bis_access_token');
      if (token) {
          this.setAuthentication(true);
          this.setCurrentUser();
      } else {
          this.setAuthentication(false);
      }
  },

  methods: {
      ...mapActions([
          'setCurrentUser',
          'setAuthentication',
          'invalidate',
          
      ])
  },

  
}
</script>

<style lang="scss">
.avatar {
    width: 60px;
    height: 60px;
    flex-basis: 60px;
    border-radius: 20px;
}

.dropdown-header {
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #000;
    border-bottom: 1px solid #555;
}
</style>


