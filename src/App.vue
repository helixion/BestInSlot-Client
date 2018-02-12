<template>
  <div id="app">
    <app-header></app-header>
    <div id="main">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
    <notifications group="notes" :position="'top center'"></notifications>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style lang="scss" src="./styles/main.scss">
</style>