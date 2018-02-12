<template>
  <div class="container">
      <div class="columns is-multiline">
          <div class="column is-12">
              <div class="status">
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {post} from 'axios';

export default {
  beforeEnterRoute(to, from, next) {
      const code = to.query.code;
      post('/forgot-password', { code })
        .then(next)
        .catch(next('/404'));
  }
}
</script>

