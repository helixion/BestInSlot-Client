<template>
  <section id="my-account" class="container">
      <div class="columns">
          <div class="column">
              <div class="content">
                  <div class="ui-tabs">
                      <div class="tabs">
                          <a v-for="(tab, index) in tabs" 
                            :key="index"
                            :class="['tab', { active: selected === tab.comp }]"
                            @click="selected = tab.comp">{{tab.name}}</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import authenticated from '@/mixins/authenticated';
export default {
  data() {
      return {
          tabs: [
              {
                  name: 'General',
                  comp: 'app-general'
              },
              {
                  name: 'Security',
                  comp: 'app-security'
              },
              {
                  name: 'Forum Settings',
                  comp: 'app-forum'
              },
              {
                  name: 'Privacy',
                  comp: 'app-privacy'
              },
          ],
          selected: 'app-general'
      }
  },

  mixins: [authenticated]
}
</script>

<style lang="scss">
#my-account {
    background-color: #23262b;
}
</style>
