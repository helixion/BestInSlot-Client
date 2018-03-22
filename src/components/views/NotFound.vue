<template>
  <div class="container">
      <div class="columns is-multiline is-centered">
          <div class="column is-12">
              <div class="status">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              </div>
          </div>
          <div class="column is-12">
              <div class="content">
                  <h1>404</h1>
                  <h2>Not Found.</h2>
              </div>
          </div>
      </div>
  </div>
</template>

<style lang="scss">
.status {
    font-size: 10rem;
    color: #ff3860;
}

.status, .content {
    text-align: center;
}

.content {
    h1, h2 {
        color: #cacaca;
    }
}
</style>
