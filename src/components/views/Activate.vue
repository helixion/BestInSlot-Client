<template>
  <section id="activate-account" class="container">
    <div class="columns is-multiline" >
      <div class="column is-half is-offset-one-quarter">
        <div class="status">
          <i :class="{ 'fa fa-check-circle-o is-success': success, 'fa fa-exclamation-circle error': !success }" aria-hidden="true"></i>          
        </div>
      </div>
      <div class="column is-12">
        <div class="content">
          <h1>{{ success? "Success!" : "Error"}}</h1>
          <h3>{{ success? "Thank you for registering, your account is now active." : "Unfortunately we couldn't authenticate your account due to an invalid or expired key. Please try again."}}</h3>
          <a class="button is-danger" v-if="!success">Resend Key</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {

  $_veeValidate: {
    validator: "new"
  },

  beforeRouteEnter(to, from, next) {
    axios.post(`/users/activate/`, { key: to.query.key })
      .then(res => {
        if (res.data.approved) {
          next(vm => {
            vm.success = true;
          });
        } else {
          if (res.data.expired) {
            next(vm => {
              vm.success = false;
            });
          }
        }
      })
      .catch(e => {
        if (e) {
          if (e.response.status >= 400) {
            next("/404");
          }
        }
      });
  },

  data() {
    return {
      success: false
    }
  },

  methods: {
    resend() {
      this.$http
        .get(`/resend/${$route.query.key}`)
        .then(res => {
          this.$notify({
            group: "notes",
            text: `Resent verification email to ${res.data.user.email}`
          });
        })
        .catch(e => {
          Object.keys(e.response).forEach(err => console.log(e.response[err]));
        });
    }
  }
};
</script>

<style lang="scss">
#activate-account {
  color: #cacaca;
  .status {
    font-size: 10rem;
    text-align: center;
    .success {
      color: #77dd77;
    }
    .error {
      color: #ff3860;
    }
  }
  .content {
    h1, h3 {
      color: #cacaca;
    }
    text-align: center;
  }
}
</style>