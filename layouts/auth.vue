<template>
  <div class="columns is-gapless">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>

    <div class="column is-half">
      <div class="hero is-fullheight with-bg">
        <div class="hero-body"></div>
      </div>
    </div>
    <div class="column is-half">
      <div class="hero is-white h100vh overflowauto">
        <div class="hero-head">
          <nav class="navbar has-shadow">
            <div class="navbar-brand">
              <nuxt-link class="navbar-item" to="/">
                PNB E-WALLET TEST
              </nuxt-link>
            </div>
          </nav>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-half is-offset-one-quarter">
                <nuxt />
              </div>
            </div>
          </div>
        </div>
        <div class="hero-foot">
          <footer class="footer footpad has-text-centered">
            <div class="content">
              <p>© 2019 <strong>PNB E-WALLET TEST</strong></p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isLoading: 'loader/isLoading'
    })
  }
}
</script>

<style>
.with-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~assets/bg1.png');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.footpad {
  padding: 1rem;
}
.h100vh {
  height: 100vh;
}
.overflowauto {
  overflow: auto;
}
.loginbtn {
  padding: 10px 0;
}
</style>
