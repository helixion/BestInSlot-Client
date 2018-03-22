<template>
  <div id="app">
    <app-header></app-header>
    <slide-out :toggles="['.navbar-burger']">
      <mobile-menu></mobile-menu>
      <main id="main" class="page">
        <router-view></router-view>
      </main>
    </slide-out>
    <app-footer></app-footer>
    <notifications group="notes" :position="'top center'"></notifications>
    <app-modal v-if="!isAuthenticated"></app-modal>
  </div>
</template>

<script>
import Header from '@/components/HeaderWithModal'
import Footer from '@/components/Footer'
import MobileMenu from '@/components/mobile/MobileMenu'
import SlideOut from '@/components/mobile/SlideOut'
import Modal from '@/components/login_modal/CustomModal'

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appFooter: Footer,
    appModal: Modal,
    MobileMenu,
    SlideOut
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
}
</script>

<style lang="scss" src="./styles/main.scss">
</style>