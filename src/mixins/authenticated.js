export default {

    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.isAuthenticated) {
                vm.$router.push('/auth');
            }
        })
    },

    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },

    watch: {
        isAuthenticated(auth) {
            if (!auth) {
                this.$router.push('/');
            }
        }
    }
}