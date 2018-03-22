<template>
  <nav id="menu">
      <div class="navbar-m-head">
          <a href="" class="navbar-item" @click.prevent="toggle(!modal)">
              <i class="fa fa-user-circle"></i>
              Sign In / Up
            </a>
      </div>
      <div class="navbar-menu" id="mobile">
          <div class="navbar-start">
              <a href="" class="navbar-item">Home</a>
              <a href="" class="navbar-item">History</a>
              <a href="" class="navbar-item">Recruitment</a>
              <a href="" class="navbar-item">Media</a>
              <a href="" class="navbar-item">Discussion</a>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'mobile-menu',
  methods: {
      toggle(bool) {
          this.$store.dispatch('setModal', bool);
      }
  },
  computed: {
      modal() {
          return this.$store.getters.modal;
      }
  }
}
</script>


<style lang="scss">
#menu {
    background-color: #1d1d1d;
    .navbar-m-head {
        text-align: center;
        background-color: #111;
        font-weight: 700;
        text-transform: uppercase;
    }
    .navbar-menu, 
    .navbar-start {
        display: flex;
        flex-direction: column;
    }
    .navbar-item {
        color: #cacaca;
    }
    .navbar-menu {
        background-color: #1d1d1d;
    }
}
</style>
