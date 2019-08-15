<template>
  <form>
    <b-field label="Email">
      <b-input v-model="email"></b-input>
    </b-field>

    <b-field label="password">
      <b-input v-model="password" type="password"> </b-input>
    </b-field>

    <p class="control loginbtn">
      <b-button type="is-primary is-fullwidth" outlined @click="login()">
        Login
      </b-button>
    </p>

    <p>
      <b-collapse :open="false" aria-id="contentIdForA11y1">
        <a
          slot="trigger"
          class="button is-primary is-fullwidth"
          aria-controls="contentIdForA11y1"
          @click="getUserList"
        >
          Get list of users
        </a>
        <div class="notification">
          <div class="content">
            <h3>User List</h3>
            <p>All users password are `password`</p>
            <b-field grouped group-multiline>
              <div v-for="user in users" :key="user.id" class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">{{ user.name }}</b-tag>
                  <b-tag type="is-info">{{ user.email }}</b-tag>
                </b-taglist>
              </div>
            </b-field>
          </div>
        </div>
      </b-collapse>
    </p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'auth',
  data() {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/list'
    })
  },
  methods: {
    login() {
      this.setIsLoading(true)
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          this.setIsLoading(false)

          if (res.error) {
            this.$buefy.dialog.alert('Invalid credentials.')
          } else {
            this.$router.push('/account')
          }
        })
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
    },
    getUserList() {
      this.$store.dispatch('user/getList')
    }
  }
}
</script>
