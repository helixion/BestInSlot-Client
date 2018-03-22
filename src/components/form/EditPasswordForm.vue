<template>
  <div class="columns is-multlined">
      <div class="column">
        <section id="edit-password">
          <div class="section-head">
            <h4 class="title is-4">Edit Password</h4>
          </div>
          <div class="section-body">
            <form action="">
              <fieldset>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label for="" class="label">Current Password:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <input :type="inputTypes['currentPassword']" class="input" v-model="credentials.currentPassword">
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label for="" class="label">New Password:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <input :type="inputTypes['newPassword']" class="input" v-model="credentials.newPassword">
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field is-grouped is-grouped-centered">
                      <div class="control is-expanded">
                        <button class="button is-primary is-fullwidth" @click.prevent="changePassword">Submit</button>
                      </div>
                      <div class="control is-expanded">
                        <button class="button is-primary is-outlined is-fullwidth">Reset</button>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  data() {
      return {
          credentials: {
              currentPassword: '',
              newPassword: '',
          },
          sending: false,
          inputTypes: {
            currentPassword: 'password',
            newPassword: 'password'
          }
      }
  },

  methods: {
      changePassword() {
          const { 
            currentPassword, 
            newPassword 
        } = this.credentials;

        this.$http
            .post('/users/edit-password', { currentPassword, newPassword })
            .then(res => {
                this.$notify({
                    group: 'notes',
                    type: 'success',
                    subject: 'An email has been dispatched.'
                })
            })
            .catch(e => {
              Object.keys(e.response).forEach(err => {
                console.log(e.response[err]);
              });
            })

      }
  }
}
</script>
