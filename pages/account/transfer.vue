<template>
  <section class="section">
    <div class="columns">
      <div class="column is-full">
        <h1 class="has-text-weight-medium is-size-5">Transfer</h1>
      </div>
    </div>
    <form @submit.prevent="transfer()">
      <div class="columns">
        <div class="column">
          <article class="message">
            <div class="message-header">
              <p>From</p>
            </div>
            <div class="message-body">
              <b-field label="Wallet">
                <b-select
                  v-model="source_wallet_id"
                  placeholder="Select wallet"
                  expanded
                  @input="resetValue('source')"
                >
                  <option
                    v-for="wallet in currentUser.wallets"
                    :key="wallet.id"
                    :value="wallet.id"
                  >
                    {{ wallet.id + ' ' + `(RM${wallet.credit})` }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </article>
        </div>
        <div class="column">
          <article v-if="source_wallet_id != null" class="message">
            <div class="message-header">
              <p>To</p>
            </div>
            <div class="message-body">
              <b-field label="Wallet">
                <b-select
                  v-model="target_wallet_id"
                  placeholder="Select wallet"
                  expanded
                  @input="resetValue('target')"
                >
                  <optgroup
                    v-for="(k, v) in wallets"
                    :key="v"
                    :label="v == 0 ? 'USER' : v == 1 ? 'TEAM' : 'STOCK'"
                  >
                    <option
                      v-for="wallet in k"
                      :key="wallet.id"
                      :value="wallet.id"
                      :disabled="wallet.id == source_wallet_id"
                    >
                      {{ wallet.owner.name }} - {{ wallet.id }}
                    </option>
                  </optgroup>
                </b-select>
              </b-field>
            </div>
          </article>
        </div>
        <div class="column">
          <article
            v-if="source_wallet_id != null && target_wallet_id != null"
            class="message"
          >
            <div class="message-header">
              <p>Transaction</p>
            </div>
            <div class="message-body">
              <b-field label="Amount">
                <b-numberinput v-model="amount" min="0"></b-numberinput>
              </b-field>

              <b-field>
                <template slot="label">
                  PIN
                  <b-tooltip
                    type="is-dark"
                    label="It wont work unless you put 123456. It is hardcoded, not generic. For testing purpose."
                  >
                    <b-icon size="is-small" icon="help-circle-outline"></b-icon>
                  </b-tooltip>
                </template>
                <b-input
                  v-model="pin"
                  type="password"
                  password-reveal
                ></b-input>
              </b-field>

              <br />

              <button
                type="submit"
                class="button is-primary is-fullwidth is-outlined"
              >
                Transfer
              </button>
            </div>
          </article>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      source_wallet_id: null,
      target_wallet_id: null,
      amount: null,
      pin: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      wallets: 'wallet/list'
    })
  },
  fetch({ store, params }) {
    return store.dispatch('auth/setCurrentUser')
  },
  methods: {
    transfer() {
      this.setIsLoading(true)
      this.$store
        .dispatch('txn/transfer', {
          source_wallet_id: this.source_wallet_id,
          target_wallet_id: this.target_wallet_id,
          amount: this.amount,
          pin: this.pin
        })
        .then((res) => {
          this.setIsLoading(false)

          if (res.hasError) {
            this.$buefy.dialog.alert(res.errors.join(', '))
          } else {
            this.$buefy.dialog.alert('Transaction successful.')
            this.$router.push('/account')
          }
        })
    },
    resetValue(field) {
      switch (field) {
        case 'source':
          this.target_wallet_id = null
          this.amount = null
          this.pin = null
          this.$store.dispatch('wallet/getList')
          break
        case 'target':
          this.amount = null
          this.pin = null
          break
        default:
        // DO NOTHING
      }
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
    }
  }
}
</script>
