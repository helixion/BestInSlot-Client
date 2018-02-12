export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.isAuthenticated) {
                this.$router.push(from.path);
            } else {
                const params = { 
                    sso: to.query.sso,
                    sig: to.query.sig
                };
                vm.$http
                    .get('/users/discourse/sso', { params })
                    .then(res => {
                        if (res.status >= 200 && res.status < 400) {
                            const { sso, sig } = res.data;
                            this.$router
                                .redirect(`http://localhost:3000/sso?sso=${sso}&sig=${sig}`);
                        }
                    })
                    .catch(e => {
                        this.$router.push('/404');
                    })
            }
        })
    },

    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },

    render(h) {
        return h();
    }
}